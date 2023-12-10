import { $fetch } from 'ofetch'

// ONLY FOR DEMO PURPOSES
const WATCHLIST_BASE_URL = 'https://watchlist.0xxmmvv.workers.dev'

const api = $fetch.create({
  baseURL: WATCHLIST_BASE_URL,
  credentials: 'omit',
})

export async function addToWatchlist(
  authAddress: string,
  chain: string,
  type: 'nft' | 'collection',
  id: string,
) {
  await api(`/${chain}/${type}/${id}`, {
    method: 'POST',
    headers: { 'x-auth-address': authAddress },
  })
}

export async function removeFromWatchlist(
  authAddress: string,
  chain: string,
  type: 'nft' | 'collection',
  id: string,
) {
  await api(`/${chain}/${type}/${id}`, {
    method: 'DELETE',
    headers: { 'x-auth-address': authAddress },
  })
}

export async function isInWatchlist(
  authAddress: string,
  chain: string,
  type: 'nft' | 'collection',
  id: string,
) {
  const { data } = await api(`/${chain}/${type}/${id}`, {
    method: 'GET',
    headers: { 'x-auth-address': authAddress },
  })

  return !!data
}
