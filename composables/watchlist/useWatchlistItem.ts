import * as api from '@/utils/watchlist'

interface WatchlistItem {
  chain: string
  type: 'nft' | 'collection'
  id: string
}

export default function useWatchlistItem(item: WatchlistItem) {
  const { accountId: authAddress } = useAuth()
  const ready = ref(false)
  const saved = ref(false)

  watch(authAddress, checkIsInWatchlist, { immediate: true })

  async function checkIsInWatchlist() {
    saved.value = await api.isInWatchlist(
      authAddress.value,
      item.chain,
      item.type,
      item.id,
    )
    ready.value = true
  }

  async function add() {
    await api.addToWatchlist(authAddress.value, item.chain, item.type, item.id)
    await checkIsInWatchlist()
  }

  async function remove() {
    await api.removeFromWatchlist(
      authAddress.value,
      item.chain,
      item.type,
      item.id,
    )
    await checkIsInWatchlist()
  }

  async function toggle() {
    if (saved.value) {
      await remove()
    } else {
      await add()
    }
  }

  return {
    ready,
    saved,
    toggle,
    add,
    remove,
  }
}
