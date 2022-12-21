<template>
	<div id="app">
		<!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
		<mu-drawer :open.sync="open" :docked="docked" :right="position === 'right'">
			<mu-list>
				<mu-list-item button @click="help">
					<mu-list-item-title>使用方法</mu-list-item-title>
				</mu-list-item>
				<mu-list-item button @click="disclaimer">
					<mu-list-item-title>免责声明</mu-list-item-title>
				</mu-list-item>
				<mu-list-item button @click="contact">
					<mu-list-item-title>联系方式</mu-list-item-title>
				</mu-list-item>
				<mu-list-item button @click="loadHost">
					<mu-list-item-title>站长网站</mu-list-item-title>
				</mu-list-item>
				<mu-list-item button @click="about">
					<mu-list-item-title>关于</mu-list-item-title>
				</mu-list-item>
				<!--  <mu-list-item  @click="open = false" button>
		        <mu-list-item-title>Close</mu-list-item-title>
		      </mu-list-item> -->
			</mu-list>
		</mu-drawer>
		<!-- 导航 -->
		<mu-appbar style="width: 100%;" color="primary" class="mu-appbar-header">
			<mu-button icon slot="left" @click="open = !open">
				<mu-icon value="menu"></mu-icon>
			</mu-button>
			小怪VIP系统 V0.2
			<!-- <mu-button icon slot="right" @click="theme_toggle">
				<mu-icon :value="theme_bool?'wb_sunny':'brightness_4'"></mu-icon>
			</mu-button> -->
		</mu-appbar>

		<!-- 内容 -->
		<mu-container style="margin-top: 60px;">
			<mu-row gutter>
				<mu-col span="12">
					<div class="search">
						<mu-text-field full-width v-model="searchParam.text" placeholder="请输入歌手歌曲关键词">
						</mu-text-field>
					</div>
				</mu-col>
				<mu-col span="12">
					<div class="search-plane">
						<div>
							<mu-radio :key="radioItem.id" v-for="(radioItem,index) in radioArr" :value="radioItem.id"
								v-model="radio" :label="radioItem.name">
							</mu-radio>
						</div>
						<div>
							<mu-button slot="right" color="primary" @click="submit">搜索</mu-button>
						</div>
					</div>
				</mu-col>
				<mu-col span="12" sm="12">
					<mu-list textline="two-line" @change="playMusic">
						<mu-sub-header>歌曲列表</mu-sub-header>
						<mu-list-item avatar button :ripple="false" :key="songItem.id"
							v-for="(songItem,index) in songArr" :value="songItem">
							<mu-list-item-action>
								<mu-avatar>
									<img :src="songItem.pic">
								</mu-avatar>
							</mu-list-item-action>
							<mu-list-item-content>
								<mu-list-item-title>{{songItem.name}}

									<span class="size_music size_sq" v-for="(kbps,index) in songItem.kbpsList"
										v-if="kbps.code=='size_flac'||kbps.code=='sq'">SQ</span>

									<span class="size_music size_hq" v-for="(kbps,index) in songItem.kbpsList"
										v-if="kbps.code=='size_320mp3'||kbps.code=='hq'">HQ</span>

									<span class="size_music size_bit24" v-for="(kbps,index) in songItem.kbpsList"
										v-if="kbps.code=='bit24'">BIT24</span>

								</mu-list-item-title>
								<mu-list-item-sub-title>{{songItem.singer}}</mu-list-item-sub-title>
							</mu-list-item-content>
							<mu-list-item-action>
								<mu-button icon @click.stop="clickDownMusic(songItem)">
									<mu-icon value="file_download"></mu-icon>
								</mu-button>
							</mu-list-item-action>
						</mu-list-item>
					</mu-list>
				</mu-col>
				<!-- 				<mu-col span="12" xl="12">
				</mu-col> -->
			</mu-row>
		</mu-container>

		<!-- 播放器 -->
		<div style="height: 120px;">
			<div class="play_bottom">
				<mu-card>
					<mu-card-text>
						<div id="aplayer">
						</div>
					</mu-card-text>
				</mu-card>
			</div>
		</div>

		<!-- 下载 -->
		<mu-bottom-sheet :open.sync="sheet_open" v-loading="loading">
			<mu-list @item-click="closeBottomSheet">
				<mu-sub-header>下载菜单</mu-sub-header>

				<mu-list-item button v-if="sheet_bit24!=''" :value="sheet_bit24">
					<mu-list-item-action>
						<mu-icon value="file_download" color="brown500"></mu-icon>
					</mu-list-item-action>
					<mu-list-item-title>下载超高无损质量 <span class="size_music size_bit24">BIT24</span></mu-list-item-title>
				</mu-list-item>

				<mu-list-item button v-if="sheet_flac!=''" :value="sheet_flac">
					<mu-list-item-action>
						<mu-icon value="file_download" color="orange"></mu-icon>
					</mu-list-item-action>
					<mu-list-item-title>下载无损质量 <span class="size_music size_sq">SQ</span></mu-list-item-title>
				</mu-list-item>


				<mu-list-item button v-if="sheet_gzl!=''" :value="sheet_gzl">
					<mu-list-item-action>
						<mu-icon value="file_download" color="blue"></mu-icon>
					</mu-list-item-action>
					<mu-list-item-title>下载高品质质量 <span class="size_music size_hq">HQ</span></mu-list-item-title>
				</mu-list-item>

				<mu-list-item button v-if="sheet_pt!=''" :value="sheet_pt">
					<mu-list-item-action>
						<mu-icon value="file_download" color="green"></mu-icon>
					</mu-list-item-action>
					<mu-list-item-title>下载普通音质</mu-list-item-title>
				</mu-list-item>


			</mu-list>
		</mu-bottom-sheet>

		<!-- 下载 -->
		<mu-dialog title="下载音乐" width="360" :open.sync="openSimple">
			获取地址成功，点击下面按钮即可下载
			<p>由于系统限制，请自行重命名</p>

			<p> 如果地址打开不对，请多解析几次看看</p>

			<p> {{play.name}} - {{play.artist}}</p>
			<mu-button slot="actions" flat color="primary" @click="copyName(play.name+' - '+play.artist)">复制名称
			</mu-button>
			<a slot="actions" :href="href" target="_blank">
				<mu-button flat color="primary">
					点击下载
				</mu-button>
			</a>

		</mu-dialog>

	</div>
</template>

<script>
	// import HelloWorld from './components/HelloWorld.vue'
	import theme from 'muse-ui/lib/theme';
	import 'aplayer/dist/APlayer.min.css';
	import APlayer from 'aplayer';
	//用的地方调用：
	import {
		getSearch, //歌曲搜索
		getSong, //歌曲
		getLyric //歌词
	} from '@/api';
	export default {
		name: 'app',
		data() {
			return {
				href: "", //下载地址
				openSimple: false, //下载信息弹窗
				sheet_open: false, //下载弹窗
				sheet_bit24: '', //咪咕最高音质
				sheet_flac: '', //下载无损
				sheet_gzl: '', //下载高质量
				sheet_pt: '', //下载普通音质
				docked: false,
				open: false,
				position: 'left',
				//下载展示
				play: {
					name: "",
					artist: ""
				},
				//播放器列表
				playList: [],
				//参数选择
				radio: "1",
				radioArr: [{
					id: "1",
					name: "小鹅"
				}, {
					id: "2",
					name: "小咕"
				}],
				//查询参数
				searchParam: {
					text: "周杰伦",
					pageNo: 1,
					pageSize: 30
				},
				//获取歌曲参数
				songParam: {
					id: '',
					code: '',
					type: ''
				},
				songArr: [],
				loading: false,
				ap: null
			}

		},
		components: {
			// HelloWorld
			// Aplayer
		},
		mounted() {
			// Aplayer.disableVersionBadge = true;

			this.ap = new APlayer({
				container: document.getElementById('aplayer'),
				preload: 'auto',
				lrcType: 2,
				storageName: "aplayer-setting",
				listFolded: true,
				mutex: true

			});

		},
		methods: {

			//复制名称
			copyName(text) {
				const input = document.createElement('input');
				document.body.appendChild(input);
				input.value = text;
				input.select();
				document.execCommand('Copy')
				document.body.removeChild(input);
				// console.log(this);
				this.$toast.success('复制成功');
			},
			//下载底部弹窗
			closeBottomSheet(item) {
				let ths = this;
				ths.songParam.code = item.value;
				this.loading = true;
				getSong(ths.songParam).then(res => {
					ths.openSimple = true;
					ths.href = res.data.data.url;
					this.loading = false;

				})

				setTimeout(() => {
					this.loading = false;
				}, 3000)
			},

			//关于
			about() {
				this.$alert('vip系统 - 0.2 Code by Vue and muse-ui', '关于');
			},
			//免责声明
			disclaimer() {
				this.$alert('本站音频文件来自各网站接口，本站不会修改任何音频文件音频版权来自各网站，本站只提供数据查询服务，不提供任何音频存储和贩卖服务如涉及侵权请联系我们删除', '免责声明');
			},
			//联系方式
			contact() {
				this.$alert('联系QQ:877059905', '联系方式');
			},
			loadHost() {
				window.open("https://www.dog886.com/");
			},
			//使用方法
			help() {
				this.$alert('在条框里续入歌名或演唱者，后点击搜索.试听点击歌名.如果下载点击下载图标，选择你要下载的音质下载', '使用方法');
			},
			//搜索
			submit() {
				const loading = this.$loading({
					// ...options
				});
				setTimeout(() => {
					loading.close();
				}, 3000)
				let ths = this;
				this.searchParam.type = ths.radio;
				getSearch(this.searchParam).then(res => {
					// console.log(res.data.data.items);
					ths.songArr = res.data.data.items;
					loading.close();
				})
			},
			//下载歌曲选项
			clickDownMusic(item) {
				this.sheet_open = true;

				this.sheet_bit24 = '';
				const bit24 = item.kbpsList.filter(item => item.code == 'bit24')[0];
				if (bit24) {
					this.sheet_bit24 = bit24.code;
				}
				this.sheet_flac = '';
				const flac = item.kbpsList.filter(item => item.code == 'size_flac' || item.code == 'sq')[0];
				if (flac) {
					this.sheet_flac = flac.code;
				}
				this.sheet_gzl = '';
				const gzl = item.kbpsList.filter(item => item.code == 'size_320mp3' || item.code == 'hq')[0];
				if (gzl) {
					this.sheet_gzl = gzl.code;
				}
				this.sheet_pt = '';
				const pt = item.kbpsList.filter(item => item.code == 'size_128mp3' || item.code == 'fullSong')[0];
				if (pt) {
					this.sheet_pt = pt.code;
				}

				let ths = this;
				//获取播放
				ths.songParam.id = item.id;
				ths.songParam.type = ths.radio;
				ths.play.artist = item.singer;
				ths.play.name = item.name;
			},
			//播放歌曲
			playMusic(item) {
				// console.log(111);
				let ths = this
				let play = {
					id: item.id,
					name: item.name, //歌曲名称
					artist: item.singer, //歌曲这种描述
					url: "", //歌曲地址
					cover: item.pic, //歌曲图片
					lrc: "" //歌词
				}

				//播放地址查询
				ths.songParam.id = item.id;
				ths.songParam.type = ths.radio;

				//获取播放
				switch (ths.radio) {
					case "1":
						ths.songParam.code = 'size_128mp3';
						break;
					case "2":
						ths.songParam.code = 'fullSong';
						break;
				}


				if (ths.playList.filter(item => item.id == play.id).length == 0) {
					getSong(ths.songParam).then(res => {
						// console.log(res.data.data.url);
						play.url = res.data.data.url

						//歌词地址查询
						const lyricParam = {
							id: item.id,
							type: ths.radio
						}
						//获取歌词
						getLyric(lyricParam).then(res => {
							play.lrc = res.data.data;
							//清空
							ths.ap.list.clear();
							ths.ap.list.add([play]);
							ths.ap.play();
							ths.ap.list.add(ths.playList);
							ths.playList.push(play);
							
						})

					})


				} else {
					this.$toast.info('已存在!');
				}





			}
		}
	}
</script>

<style>
	.size_music {
		background: #f0f0f0;
		padding: 1px 5px;
		margin-left: 5px;
		font-size: 12px;
		color: #fff;
		border-radius: 2px;
	}

	.size_hq {
		background: #1ecc94;
	}

	.size_sq {
		background: #fe6500;
	}

	.size_bit24 {
		background: #8B795E;
	}

	.search-plane {
		display: flex;
		justify-content: space-between;
	}

	.search {
		margin-top: 3vh;
	}

	.play_bottom {
		position: fixed;
		bottom: 0;
		/* border: 1px solid red; */
		width: 100%;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 101;
	}

	/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
	* {
		padding: 0;
		margin: 0;
	}

	html,
	body,
	#app {
		height: 100%;

	}

	.mu-appbar-header {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		z-index: 101;
		overflow: hidden;
	}
</style>
