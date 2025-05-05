import { Howler } from 'howler'

class HiFiBassAnalyzer {
  private readonly ctx: AudioContext
  private readonly splitter: ChannelSplitterNode
  private readonly lowpass: BiquadFilterNode
  private readonly analyser: AnalyserNode
  private dataArray: Float32Array // 高精度浮点采样

  constructor() {
    this.ctx = Howler.ctx as AudioContext

    // 创建无损旁路处理链
    this.splitter = this.ctx.createChannelSplitter(2)
    this.lowpass = this.ctx.createBiquadFilter()
    this.analyser = this.ctx.createAnalyser()

    // 关键配置
    this.lowpass.type = 'lowpass'
    this.lowpass.frequency.value = 90 // 主频点
    this.lowpass.Q.value = 0.707 // Butterworth 滤波特性
    this.analyser.fftSize = 4096 // 高分辨率模式
    this.analyser.smoothingTimeConstant = 0.2 // 低延迟响应
    this.dataArray = new Float32Array(this.analyser.fftSize)

    // 信号路由
    Howler.masterGain.connect(this.splitter)
    this.splitter.connect(this.lowpass, 0) // 左声道分析
    this.lowpass.connect(this.analyser)
  }

  // 获取瞬态低频能量 (RMS)
  getTransientBass(): number {
    this.analyser.getFloatTimeDomainData(this.dataArray)
    return this.calculateRMS(this.dataArray)
  }

  // 获取稳态低频能量 (FFT)
  getSustainedBass(): number {
    const freqData = new Float32Array(this.analyser.frequencyBinCount)
    this.analyser.getFloatFrequencyData(freqData)
    return this.integrateBassBand(freqData)
  }

  private calculateRMS(data: Float32Array): number {
    const sum = data.reduce((acc, val) => acc + val ** 2, 0)
    return Math.sqrt(sum / data.length)
  }

  private integrateBassBand(data: Float32Array): number {
    const binWidth = this.ctx.sampleRate / this.analyser.fftSize
    const startBin = Math.floor(60 / binWidth) // 60Hz起始点
    const endBin = Math.ceil(120 / binWidth) // 120Hz截止点
    return data.slice(startBin, endBin).reduce((a, b) => a + 10 ** (b / 20), 0)
  }
}

export default HiFiBassAnalyzer
