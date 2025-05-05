<template>
  <div class="audio-3d-control">
    <h3>3D音效控制</h3>

    <div class="control-section">
      <h4>位置控制 (pos)</h4>
      <div class="slider-group">
        <div class="slider-item">
          <label>X轴 (左右): {{ posX.toFixed(1) }}</label>
          <input v-model="posX" type="range" min="-1" max="1" step="0.1" @input="updatePosition" />
        </div>
        <div class="slider-item">
          <label>Y轴 (上下): {{ posY.toFixed(1) }}</label>
          <input v-model="posY" type="range" min="-1" max="1" step="0.1" @input="updatePosition" />
        </div>
        <div class="slider-item">
          <label>Z轴 (前后): {{ posZ.toFixed(1) }}</label>
          <input v-model="posZ" type="range" min="-1" max="1" step="0.1" @input="updatePosition" />
        </div>
      </div>
    </div>

    <div class="control-section">
      <h4>方向控制 (orientation)</h4>
      <div class="slider-group">
        <div class="slider-item">
          <label>X轴方向: {{ orientationX.toFixed(1) }}</label>
          <input v-model="orientationX" type="range" min="-1" max="1" step="0.1" @input="updateOrientation" />
        </div>
        <div class="slider-item">
          <label>Y轴方向: {{ orientationY.toFixed(1) }}</label>
          <input v-model="orientationY" type="range" min="-1" max="1" step="0.1" @input="updateOrientation" />
        </div>
        <div class="slider-item">
          <label>Z轴方向: {{ orientationZ.toFixed(1) }}</label>
          <input v-model="orientationZ" type="range" min="-1" max="1" step="0.1" @input="updateOrientation" />
        </div>
      </div>
    </div>

    <div class="control-section">
      <h4>立体声控制 (stereo)</h4>
      <div class="slider-item">
        <label>立体声平衡: {{ stereoValue.toFixed(1) }}</label>
        <input v-model="stereoValue" type="range" min="-1" max="1" step="0.1" @input="updateStereo" />
        <div class="stereo-labels">
          <span>左</span>
          <span>中</span>
          <span>右</span>
        </div>
      </div>
    </div>

    <div class="preset-buttons">
      <button @click="resetToDefaults">重置</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { usePlayerStateStore } from '@renderer/store/modules/playerState'

const playerStateStore = usePlayerStateStore()

// 位置控制
const posX = ref(0.1)
const posY = ref(-0.1)
const posZ = ref(-0.5)

// 方向控制
const orientationX = ref(0)
const orientationY = ref(0)
const orientationZ = ref(1)

// 立体声控制
const stereoValue = ref(0)

// 应用当前设置
function updatePosition(): void {
  if (playerStateStore.howl) {
    playerStateStore.howl.pos(posX.value, posY.value, posZ.value)
  }
}

function updateOrientation(): void {
  if (playerStateStore.howl) {
    playerStateStore.howl.orientation(orientationX.value, orientationY.value, orientationZ.value)
  }
}

function updateStereo(): void {
  if (playerStateStore.howl) {
    playerStateStore.howl.stereo(stereoValue.value)
  }
}

// 重置到默认值
function resetToDefaults(): void {
  posX.value = 0.1
  posY.value = -0.1
  posZ.value = -0.5
  orientationX.value = 0
  orientationY.value = 0
  orientationZ.value = 1
  stereoValue.value = 0

  updatePosition()
  updateOrientation()
  updateStereo()
}

// 初始化时从当前播放器设置加载
onMounted(() => {
  // 如果有修改过的设置，可以在这里加载
})
</script>

<style scoped>
.audio-3d-control {
  padding: 16px;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  margin: 16px 0;
}

h3 {
  margin-top: 0;
  margin-bottom: 16px;
}

h4 {
  margin-bottom: 8px;
}

.control-section {
  margin-bottom: 20px;
}

.slider-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.slider-item {
  display: flex;
  flex-direction: column;
}

.slider-item label {
  margin-bottom: 4px;
}

input[type='range'] {
  width: 100%;
}

.stereo-labels {
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 0.8em;
  color: #666;
  margin-top: 2px;
}

.preset-buttons {
  display: flex;
  gap: 8px;
  margin-top: 16px;
}

button {
  padding: 6px 12px;
  border-radius: 4px;
  border: 1px solid #ccc;
  background-color: #f5f5f5;
  cursor: pointer;
}

button:hover {
  background-color: #e5e5e5;
}
</style>
