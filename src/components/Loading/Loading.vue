<template>
  <div class="loading">
    <template v-if="type==='pulse'">
      <div class="loading-con loading-pulse">
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
      </div>
    </template>
    <template v-else-if="type==='circle'">
      <div class="loading-con loading-circle">
        <span></span>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'loading',
  props: ['type']
}
</script>

<style lang="scss" scoped>
.loading {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.3);

  .loading-con {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }

  .loading-pulse {
    width: 50px;
    height: 50px;
    margin: auto;

    i {
      display: block;
      float: left;
      width: 6px;
      height: 50px;
      background-color: #399;
      margin: 0 2px;
      -webkit-transform: scaleY(0.4);
      -ms-transform: scaleY(0.4);
      transform: scaleY(0.4);
      -webkit-animation: pulse 1.2s infinite;
      animation: pulse 1.2s infinite;

      &:nth-child(2) {
        -webkit-animation-delay: 0.1s;
        animation-delay: 0.1s;
      }

      &:nth-child(3) {
        -webkit-animation-delay: 0.2s;
        animation-delay: 0.2s;
      }

      &:nth-child(4) {
        -webkit-animation-delay: 0.3s;
        animation-delay: 0.3s;
      }

      &:nth-child(5) {
        -webkit-animation-delay: 0.4s;
        animation-delay: 0.4s;
      }
    }
  }

  .loading-circle {
    width: 100px;
    height: 100px;
    margin: auto;

    span {
      display: block;
      width: 80px;
      height: 80px;
      position: absolute;
      left: 10px;
      top: 10px;
      border-radius: 50%;
      -webkit-box-shadow: 0 3px 0 #399;
      box-shadow: 0 3px 0 #399;
      -webkit-animation: rotate 1s infinite linear;
      animation: rotate 1s infinite linear;
    }
  }
}

@-webkit-keyframes pulse {
  0%,
  40%,
  100% {
    -webkit-transform: scaleY(0.4);
    transform: scaleY(0.4);
  }
  20% {
    -webkit-transform: scaleY(1);
    transform: scaleY(1);
  }
}

@keyframes pulse {
  0%,
  40%,
  100% {
    -webkit-transform: scaleY(0.4);
    transform: scaleY(0.4);
  }
  20% {
    -webkit-transform: scaleY(1);
    transform: scaleY(1);
  }
}

@-webkit-keyframes rotate {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes rotate {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
