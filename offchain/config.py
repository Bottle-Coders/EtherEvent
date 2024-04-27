import os

PINATA_GATEWAY = os.getenv('PINATA_GATEWAY')
DEPLOYER_PRIVATE_KEY = os.getenv('DEPLOYER_PRIVATE_KEY')
CONTRACT_CheckInManager = os.getenv('CONTRACT_CheckInManager')

iExecContractPath = '/deployments/iExec/CheckInManager.json'
iExecHttpProvider = 'https://bellecour.iex.ec'
