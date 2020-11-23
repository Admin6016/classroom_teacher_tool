import request from '@/utils/request'

export async function getSrc() {
  const res = await request({
    method: 'GET',
    url: 'https://infinity-api.infinitynewtab.com/random-wallpaper'
  })
  return res.data[0].src.rawSrc
}
