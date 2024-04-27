import React, { useEffect, useState } from 'react'
import {
  Button,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Box,
} from '@chakra-ui/react'
import { useWriteContract } from 'wagmi'
import toast from 'react-hot-toast'
import { useContracts } from '../providers/contracts'
import { uploadFile, getFileUrl } from '../modules/IPFS'
import Image from 'next/image'
import {
  useCreateProtectedDataMutation,
  useGrantNewAccessMutation,
  WEB3MAIL_IDAPPS_WHITELIST_SC,
} from '../app/appSlice'
import { useAccount } from 'wagmi'

export function RegisterUserButtonModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState('')
  const [faceHash, setFaceHash] = useState('')
  const [email, setEmail] = useState('')
  const { data: contractsData } = useContracts()
  const { data: hash, isPending, isError, writeContract } = useWriteContract()
  const userRegistry = contractsData?.UserRegistry
  const [createProtectedData] = useCreateProtectedDataMutation()
  const [grantNewAccess] = useGrantNewAccessMutation()

  const [isProtectedDataLoading, setProtectedDataLoading] = useState(false)

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  useEffect(() => {
    if (hash && !isPending) {
      if (!isError) {
        if (isProtectedDataLoading) return
        const toastId = toast.loading('Registering user...')
        setTimeout(() => {
          toast.success('User registered successfully!', { id: toastId })
          closeModal()
          window.location.reload()
        }, 4000)
      } else {
        toast.error('Error registering user!')
      }
    }
  }, [hash, isPending, isError, isProtectedDataLoading])

  const registerUser = async () => {
    setProtectedDataLoading(true)
    writeContract({
      address: userRegistry?.address as any,
      abi: userRegistry?.abi,
      functionName: 'registerUser',
      args: [name, faceHash],
    })

    const protectData = {
      data: {
        email,
        SMTPserver: {
          port: 5000,
          smtp_server: 'smtp.gmail.com',
        },
      },
      name: 'User Data',
    }

    const data = (await createProtectedData(protectData)) as any
    console.log('data:', data)

    await grantNewAccess({
      protectedData: (data as any).data,
      authorizedApp: WEB3MAIL_IDAPPS_WHITELIST_SC,
      authorizedUser: '0x0000000000000000000000000000000000000000',
      numberOfAccess: 10,
    })

    setProtectedDataLoading(false)
  }

  const handleNameChange = (event: any) => setName(event.target.value)

  const handleFileChange = async (event: any) => {
    const file = event.target.files[0]
    if (file) {
      toast.promise(
        uploadFile(file).then((hash) => {
          setFaceHash(hash)
          return getFileUrl(hash)
        }),
        {
          loading: 'Uploading image...',
          success: 'Image uploaded successfully!',
          error: 'Error uploading image!',
        },
      )
    }
  }

  return (
    <>
      <Button
        onClick={openModal}
        textColor={'#fff'}
        background={
          'linear-gradient(90deg, rgba(90,21,132,1) 0%, rgba(112,28,145,1) 100%)'
        }
        _hover={{
          background: 'linear-gradient(90deg, #3d1158 0%, #5b0d7a 100%)',
        }}
        _active={{
          background:
            'linear-gradient(90deg, rgba(90,21,132,1) 0%, rgba(112,28,145,1) 100%)',
        }}
      >
        Register
      </Button>

      <Modal isOpen={isOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Register New User</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input value={name} onChange={handleNameChange} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Email</FormLabel>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Upload Face Image</FormLabel>
              <Input type="file" onChange={handleFileChange} />
              {faceHash && (
                <Box mt={2}>
                  <Image
                    src={getFileUrl(faceHash)}
                    alt="Uploaded Face"
                    width={100}
                    height={100}
                    layout="responsive"
                    objectFit="cover"
                  />
                </Box>
              )}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={registerUser}>
              Register
            </Button>
            <Button onClick={closeModal}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
