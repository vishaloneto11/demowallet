import { HashConnect } from 'hashconnect';

let accountId =""

let saveData ={
  topic:"",
  pairingString:"",
  privateKey:"",
  pairedWalletData:null,
  pairedAccounts:[]

}

let appMetadata = {
  name: "Nft marketplace oneto11",
  description: "nft marketplace oneto11",
  icon: "https://absolute.url/to/icon.png",

}

let hashconnect = new HashConnect();

const connectWallet = async()=>{
  
  let initData = await hashconnect.init(appMetadata);
  saveData.privateKey =initData.privateKey

  let state = await hashconnect.connect()
  saveData.topic = state.topic

  console.log('\nTopic is : ${saveData.topic} ')


  saveData.pairingString = hashconnect.generatePairingString(state,"testnet",false)

  const result = hashconnect.findLocalWallets()

  console.log(result +'result')

  hashconnect.connectToLocalWallet(saveData.pairingString)


  hashconnect.pairingEvent.once(pairingData =>{
    pairingData.accountIds.forEach(id=>{
      accountId=id
      console.log(accountId)
    })
  })
}

function App() {
  return (
    <div>
        <h1>hashpack demo connection</h1>
        <button onClick={connectWallet}>Connect To Hashpack</button>
    </div>
  );
}

export default App;
