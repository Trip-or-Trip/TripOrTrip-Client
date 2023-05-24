<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="contact-info">
          <ul>
            <li><a href="https://github.com/Trip-or-Trip"><img class="icon" :src="require(`@/assets/img/icon.png`)"/></a></li>
            <li><a href="https://apis.map.kakao.com/"><img class="icon" :src="require(`@/assets/img/kakao-map-api.png`)"/></a></li>
            <li><a href="https://www.data.go.kr/"><img class="icon" :src="require(`@/assets/img/public-data-api.png`)"/></a></li>
          </ul>
        </div>
      </div>
      <div class="copyright">
        <p>© 2023 Trip or Trip. All rights reserved. <a href="#">Privacy Policy</a></p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'TheFooterNav',
};
</script>

<style scoped>
.footer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  border-top: 1px solid lightgray;
  background-color: #ffffff;
  padding-top: 10px;
  padding-left: 30px;
  padding-right: 30px;
  text-align: center;
}
.container {
  max-width: 960px;
  margin: 0 auto;
}

.icon{
    width: 50px;
    height: 50px;
}

.footer-content {
  justify-content: center;
  display:flex;
  /* margin-bottom: 20px; */
}

.contact-info {
  text-align: center;
}

.contact-info ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.contact-info li {
  display: inline-block;
  margin-right: 50px;
}

.contact-info a {
  text-decoration: none;
  color: #000;
}

.contact-info a:hover {
  color: #888;
}

.contact-info h3 {
  margin-bottom: 10px;
}

.footer .copyright {
  font-size: 12px;
  color: #888;
}
</style>
