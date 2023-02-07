import Store from 'electron-store'

interface StoreType {
  documents: Record<string, any>
}

const store = new Store<StoreType>({
  defaults: {
    documents: {},
  },
})
console.log(store.path)
