from web3 import Web3, HTTPProvider
from web3.middleware import geth_poa_middleware
import json
import requests
from web3.exceptions import TransactionNotFound


class BlockchainClient:
    def __init__(self, http_provider, private_key):
        self.w3 = Web3(Web3.HTTPProvider(http_provider))
        self.w3.middleware_onion.inject(geth_poa_middleware, layer=0)
        self.account = self.w3.eth.account.from_key(private_key)
        self.contract = None

    def load_contract(self, contract_path_or_url):
        print(f"Loading contract from: {contract_path_or_url}")
        contract_json = None

        if contract_path_or_url.startswith('https'):
            contract_json = requests.get(contract_path_or_url).json()
        else:
            with open(contract_path_or_url) as json_file:
                contract_json = json.load(json_file)

        contract_address = Web3.to_checksum_address(contract_json['address'])
        contract_abi = contract_json['abi']

        print(f"Loading contract at address: {contract_address}")
        self.contract = self.w3.eth.contract(address=contract_address, abi=contract_abi)

    def build_transaction(self, function_call, from_address):
        try:
            block = self.w3.eth.get_block('latest')
            if 'baseFeePerGas' in block:
                max_fee_per_gas = block['baseFeePerGas'] * 2
                max_priority_fee_per_gas = block['baseFeePerGas'] // 2
                return function_call.build_transaction({
                    'from': from_address,
                    'nonce': self.w3.eth.get_transaction_count(from_address),
                    'maxFeePerGas': max_fee_per_gas,
                    'maxPriorityFeePerGas': max_priority_fee_per_gas,
                    'type': '0x2'  # EIP-1559 tx type
                })
            else:
                return function_call.build_transaction({
                    'from': from_address,
                    'nonce': self.w3.eth.get_transaction_count(from_address),
                    'gasPrice': self.w3.eth.gas_price
                })
        except TransactionNotFound:
            # Fallback if unable to fetch latest block information
            return function_call.build_transaction({
                'from': from_address,
                'nonce': self.w3.eth.get_transaction_count(from_address),
                'gasPrice': self.w3.eth.gas_price
            })

    def reply_to_checkin_request(self, event_id, user_address, checkin_id, result):
        function_call = self.contract.functions.replyCheckIn(event_id, user_address, checkin_id, result)
        transaction = self.build_transaction(function_call, self.account.address)
        signed_tx = self.w3.eth.account.sign_transaction(transaction, private_key=self.account.key)
        tx_hash = self.w3.eth.send_raw_transaction(signed_tx.rawTransaction)
        self.w3.eth.wait_for_transaction_receipt(tx_hash)

    def build_transaction(self, function_call, from_address):
        try:
            block = self.w3.eth.get_block('latest')
            if 'baseFeePerGas' in block:
                max_fee_per_gas = block['baseFeePerGas'] * 2
                max_priority_fee_per_gas = block['baseFeePerGas'] // 2
                return function_call.build_transaction({
                    'from': from_address,
                    'nonce': self.w3.eth.get_transaction_count(from_address),
                    'maxFeePerGas': max_fee_per_gas,
                    'maxPriorityFeePerGas': max_priority_fee_per_gas,
                    'type': '0x2'
                })
            else:
                return function_call.build_transaction({
                    'from': from_address,
                    'nonce': self.w3.eth.get_transaction_count(from_address),
                    'gasPrice': self.w3.eth.gas_price
                })
        except Exception as e:
            print(f"Error building transaction: {e}")
            raise
