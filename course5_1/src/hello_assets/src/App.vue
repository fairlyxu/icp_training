<template>
  <div class="mainbady">
    <!--PC导航栏-->
    <nav class="nav-bar-holder">
      <div class="nav-bar"
           id="nav-bar">
        <div class="logo-box">
          <a href="index.html"
             class="blog-title ta-c"><img style="vertical-align: top"
                 alt="logo"
                 src="img/logo.png" /></a>
        </div>
      </div>
    </nav>
    <!--mobile导航栏-->
    <nav class="mobile-nav">
      <div class="logo-box">
        <a href="index.html"
           class="blog-title ta-c">
          <img style="vertical-align: top"
               alt="logo"
               src="img/logo.png" /></a>
      </div>
      <a id="mobile_cate"
         style="background-image: url('../img/cate.svg')"
         href="javascript:void(0);"></a>
    </nav>

    <!--主体-->
    <div class="postform">
      <el-form :model="form"
               status-icon
               ref="form"
               label-width="80px"
               class="demo-ruleForm">
        <el-form-item prop="email"
                      label="Say Sth"
                      :rules="[
      { required: true, message: 'please say something~'  }  ]">
          <el-input type="textarea"
                    v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item label="Secret"
                      prop="pass"
                      :rules="[ { required: true, message: 'please input  verification code ~' } , ]">
          <el-input type="password"
                    v-model="form.name"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="submitForm()">post</el-button>
        </el-form-item>

      </el-form>

    </div>

    <div class="big-container"
         id="particles-js">
      <article class="article">
        <!--左容器-->
        <div class="left-holder">
          <div>
            <el-tabs v-model="activeName"
                     @tab-click="handleTabClick">
              <el-tab-pane label="My Followings Messages"
                           name="1">My Followings Messages</el-tab-pane>
              <el-tab-pane label="My Posts"
                           name="2">My Posts</el-tab-pane>
            </el-tabs>
          </div>

          <el-button type="primary"
                     style="margin-top: 1em;"
                     @click="refresh">refresh</el-button>
          <!--文章内容-->
          <div id="article-holder"
               style="width: 100%; float: left"
               v-loading="blogloading"
               element-loading-text="Blog loading"
               element-loading-spinner="el-icon-loading">
            <div class="article-box"
                 v-for="item in curtimeLineList">
              <div class="ab-content">
                <div class="article-title">
                  <a href="article.html"> {{ item.author }} </a>
                </div>
                <div class="article-cate">
                  <a>{{ dateFormat(item.time) }}</a>
                </div>
                <div class="article-detail-box c-666">
                  {{ item.content }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!--右容器-->
        <div class="right-holder">
          <!--个人介绍-->
          <div class="column-container">
            <ul class="column_box"
                id="like-box">
              <li class="column-title">
                <span class="at-sort b-b-ece fl"><a class="at-sort-comment-a c-666 fl">About Me</a></span>
              </li>
              <li class="person-img-li">
                <img alt="头像"
                     id="person-img"
                     src="img/userimg.png" />
              </li>
              <li class="person-intro-detail gradient-text">
                <h1>Welcome to my blog</h1>
              </li>
              <li class="person-intro-detail">
                <h3>Fairy Xu @Shanghai,China</h3>
                <h5>Principal: wndvw-naaaa-aaaai-qfj4a-cai</h5>
              </li>
            </ul>
          </div>
          <!--关注列表-->
          <div class="column-container">
            <ul class="column_box"
                id="like-box"
                v-loading="loading"
                element-loading-text="Followings loading"
                element-loading-spinner="el-icon-loading">
              <li class="column-title">
                <span class="at-sort b-b-ece fl"><a class="at-sort-comment-a c-666 fl">Followings</a></span>
              </li>
              <li class="column-category"
                  style="margin-top: 5px"
                  v-for="(value, key) in followList">
                <a style="height: auto"
                   @click="handleFollowClick(key)">
                  <p style="font-weight: 600; height: 1.5em">
                    <el-avatar icon="el-icon-user-solid"
                               size="small"
                               style="margin-right: 8px"></el-avatar>{{ value }}
                  </p>
                  <p>Principal: {{ key }}</p>
                </a>
              </li>
            </ul>
          </div>

          <!--Baca-->
          <div class="column-container">
            <ul class="column_box"
                id="like-box">
              <li class="person-intro-detail">
                <h4>
                  BACA is a reading and blogging platform with an innovative
                  incentive program. Please refer to our whitepaper:
                  https://whitepaper.bacamedium.com/
                </h4>
              </li>
              <li class="person-intro-detail">
                <h3>
                  We are hiring! Feel free to contact "fairlyxu" on WeChat.
                </h3>
              </li>
            </ul>
          </div>
        </div>
      </article>
    </div>
    <!--尾部-->
    <footer class="footer"></footer>
  </div>
</template>
<script>
import { hello, createActor } from "../../declarations/hello";
import { Principal } from "@dfinity/principal";
import { Notification } from "element-ui";
export default {
  components: {},
  data: () => {
    return {
      postInterval: "",
      followInterval: "",
      timelineInterval: "",
      mypostList: [],
      followList: {},
      timeLineList: [],
      curtimeLineList: [],
      uid: "",
      uname: "",
      activeName: '1',
      loading: true,
      blogloading: true,
      loginForm: {
        email: '',
        password: ''
      },
      form: {
        name: "",
        desc: "",
      },
    };
  },
  async created () {
    this.follows = this.getFollowList();
    this.curtimeLineList = await this.getTimeLineList();
    this.blogloading = false;
  },

  methods: {
    dateFormat (ts) {
      return new Date(Number(ts) / 1000000).toLocaleString();
    },
    async refresh () {
      this.curtimeLineList = this.timeLineList

    },
    async getMyPostList () {
      this.mypostList = await hello.posts();
    },
    async getTimeLineList () {
      var res = await hello.timeline();
      this.timeLineList = res
      return res
    },
    async getFollowList () {
      this.loading = true
      var followres = await hello.follows();
      for (var i in followres) {
        let canister = createActor(followres[i]);
        let name = await canister.get_name();
        this.followList[followres[i]] = name[0];
      }
      this.loading = false
    },
    async submitForm () {
      if (this.form.desc == "" || this.form.name == "") {
        return
      }
      let res = await hello.post(this.form.desc, this.form.name);
      console.log("post res", res);
      const h = this.$createElement;
      var options = {
        message: h("i", { style: "color: teal" }, "post success"),
      };
      Notification.success(options);
    },
    getFollowTimeLine (name) {
      console.log(name)
      var tmp = []
      for (const v of this.timeLineList) {
        if (v["author"] == name) {
          tmp.push(v)
        }
      }
      return tmp;
    },
    async handleFollowClick (uid) {
      this.blogloading = true
      console.log(uid);
      var principal_id = Principal.fromText(uid);

      this.curtimeLineList = await hello.timeline_by_principal(principal_id)
      this.blogloading = false
      this.activeName = '1'

    },
    handleTabClick (tab, event) {
      console.log(tab.name)
      if (tab.name == "2") {
        this.curtimeLineList = this.getFollowTimeLine("FairyXu")
        console.log(this.curtimeLineList)
      }
      else if (tab.name == "1") {
        this.curtimeLineList = this.timeLineList

      }
    }
  },
  mounted () {
    //this.postInterval = setInterval(this.getMyPostList, 3000);
    this.followInterval = setInterval(this.getFollowList, 100000);
    this.timelineInterval = setInterval(this.getTimeLineList, 10000);
  },
  beforeDestroy () {
    //clearInterval(this.postInterval);
    clearInterval(this.followInterval);
    clearInterval(this.timelineInterval);
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.postform {
  margin-top: 70px;
  width: 80%;
  margin: auto;
  margin-top: 70px;
}
</style>