<template>
  <div class="sound-3d-page">
    <h2 class="page-title">3D音效设置</h2>
    <p class="page-description">在此页面中，您可以调整音乐的3D空间效果，包括位置、方向和立体声平衡。</p>

    <Audio3DControl />

    <div class="explanation">
      <h3>功能说明</h3>
      <ul>
        <li><strong>位置控制 (pos)</strong>: 设置音源在3D空间中的位置，相对于听者的位置。</li>
        <li><strong>方向控制 (orientation)</strong>: 设置音源在3D空间中指向的方向。</li>
        <li><strong>立体声控制 (stereo)</strong>: 调整声音在左右声道的分布。</li>
      </ul>

      <div class="coordinate-system">
        <h4>坐标系说明</h4>
        <p><strong>X轴</strong>: 负值向左，正值向右</p>
        <p><strong>Y轴</strong>: 负值向下，正值向上</p>
        <p><strong>Z轴</strong>: 负值远离听者，正值靠近听者</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Audio3DControl from '@renderer/components/Audio3DControl.vue'
</script>

<style scoped>
.sound-3d-page {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.page-title {
  margin-bottom: 12px;
  font-size: 24px;
}

.page-description {
  margin-bottom: 24px;
  color: #666;
}

.explanation {
  margin-top: 32px;
  padding: 16px;
  background-color: rgba(0, 0, 0, 0.03);
  border-radius: 8px;
}

.explanation h3 {
  margin-top: 0;
  margin-bottom: 12px;
}

.explanation ul {
  padding-left: 20px;
}

.explanation li {
  margin-bottom: 8px;
}

.coordinate-system {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.coordinate-system h4 {
  margin-top: 0;
  margin-bottom: 12px;
}

.coordinate-system p {
  margin: 6px 0;
}
</style>
