import React, { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Webcam from 'react-webcam'
import toast from 'react-hot-toast'
import { uploadFile } from '../modules/IPFS'
import { useContracts } from '../providers/contracts'
import { useWriteContract } from 'wagmi'
import {
  useSendEmailMutation,
  useFetchProtectedDataQuery,
  selectAppIsConnected,
} from '../app/appSlice'
import { useAppSelector } from '../app/hooks'
import { useAccount } from 'wagmi'

function CaptureButton({
  getScreenshot,
  uploadImage,
}: {
  getScreenshot: () => void
  uploadImage: () => void
}) {
  return (
    <div>
      <button
        onClick={getScreenshot}
        className="rounded-full bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
      >
        Capture Photo
      </button>
      <button
        onClick={uploadImage}
        className="ml-4 rounded-full bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
      >
        Upload Photo
      </button>
    </div>
  )
}

function useLocation() {
  const [location, setLocation] = useState<{
    latitude: number
    longitude: number
  } | null>(null)

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        setLocation({ latitude: coords.latitude, longitude: coords.longitude })
      })
    }
  }, [])

  return location
}

export function Checkin({ id }: { id: number }) {
  const { address } = useAccount()

  const router = useRouter()
  const webcamRef = React.useRef<Webcam>(null)
  const location = useLocation()
  const [photo, setPhoto] = useState<string | null>(null)
  const { data: contractsData } = useContracts()
  const {
    data: hash,
    isPending,
    isError,
    error,
    writeContract,
  } = useWriteContract()
  const checkInManager = contractsData?.CheckInManager
  const isAccountConnected = useAppSelector(selectAppIsConnected)
  const { data: protectedData } = useFetchProtectedDataQuery(
    address as string,
    {
      skip: !isAccountConnected,
    },
  )
  const [sendEmail] = useSendEmailMutation()
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot()
    setPhoto(imageSrc || null)
  }, [webcamRef])

  const uploadPhoto = async () => {
    if (photo) {
      const fetchRes = await fetch(photo)
      const blob = await fetchRes.blob()
      const file = new File([blob], 'photo.jpeg', { type: 'image/jpeg' })
      try {
        const ipfsHash = await uploadFile(file)
        toast.success('Photo uploaded successfully!')
        requestCheckIn(ipfsHash)
      } catch (error) {
        toast.error('Error uploading photo. Try again later.')
        console.error(error)
      }
    } else {
      toast.error('No photo to upload. Please capture a photo first.')
    }
  }

  const requestCheckIn = (ipfsHash: string) => {
    console.log('protectedData:', protectedData)
    if (!protectedData) return
    const emailProtectedData = protectedData.find((data) => data.schema.email)
    if (!emailProtectedData) return
    writeContract({
      address: checkInManager?.address as any,
      abi: checkInManager?.abi,
      functionName: 'requestCheckIn',
      args: [
        id,
        ipfsHash,
        `${location?.latitude},${location?.longitude}`,
        emailProtectedData.address,
      ],
    })
  }

  const [isSendingEmail, setIsSendingEmail] = useState(false)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const sendEmailHandle = async () => {
    console.log('protectedData:', protectedData)
    if (!protectedData) return
    const emailProtectedData = protectedData.find((data) => data.schema.email)
    if (!emailProtectedData) return

    console.log('emailProtectedData:', emailProtectedData)

    console.log('Sending email...')
    await sendEmail({
      senderName: 'iPresence',
      contentType: 'text/html',
      emailSubject: 'Check-in Confirmation',
      emailContent: `You have successfully checked in to the event with ID: ${id}`,
      protectedData: emailProtectedData.address,
    })
      .unwrap()
      .then(() => {
        console.log('Email sent!')
      })
      .catch((error: any) => {
        console.error('Error sending email:', error)
      })
  }

  useEffect(() => {
    if (hash && !isPending) {
      if (!isError) {
        if (!isSendingEmail) {
          setIsSendingEmail(true)
          const toastId = toast.loading('Checking in...')

          sendEmailHandle().then(() => {
            setTimeout(() => {
              toast.success('Checking created successfully!', { id: toastId })
              router.push('/event/' + id)
            }, 5000)
          })
        }
      } else {
        toast.error('Error creating check-in')
      }
    }
  }, [
    hash,
    isPending,
    isError,
    router,
    id,
    sendEmailHandle,
    setIsSendingEmail,
    isSendingEmail,
  ])

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: 'user',
  }

  return (
    <main className="m-auto mt-8 flex min-h-screen w-full flex-col items-center justify-center">
      {photo ? (
        <Image src={photo} alt="Captured photo" width={1280} height={720} />
      ) : (
        <Webcam
          audio={false}
          height={720}
          screenshotFormat="image/jpeg"
          width={1280}
          videoConstraints={videoConstraints}
          ref={webcamRef}
        />
      )}

      <CaptureButton getScreenshot={capture} uploadImage={uploadPhoto} />

      <div className="mt-4">
        {location ? (
          <p>
            Latitude: {location.latitude}, Longitude: {location.longitude}
          </p>
        ) : (
          <p>Loading location...</p>
        )}
      </div>
    </main>
  )
}
