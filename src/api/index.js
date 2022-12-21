import {
	get,
	post
} from '@/config/request'

//歌曲搜索
export function getSearch(data) {
		return get(
			'/v1/getSearch',
			data
		)
}

//歌曲播放获取
export function getSong(data) {
		return get(
			'/v1/getSong',
			data
		)
}
//获取歌词
export function getLyric(data) {
		return get(
			'/v1/getLyric',
			data
		)
}