 <template>
    <div>
    <div class="audioList" :style="audioListHeightStyle">
        <ul id='recordingslist'>
            <li v-for="(audioItem, index) in audioList">
                <span> {{ index + 1 }}.</span>
                <audio
                    controls
                    controlsList="play timeline nodownload novolume"
                    v-bind:src="audioItem.url"/> 
                <a
                    class="flexPush"
                    v-bind:href="audioItem.url"
                    v-bind:download="audioItem.fileName"
                > 
                    <i class="iconSize material-icons dark" >save</i>
                </a>
                
                <a
                    @click="handleClickRemove(index)"
                > 
                    <i class="iconSize material-icons dark" >cancel</i>
                </a>
                <fire-storage-uploader v-bind:audioItem='audioItem'/>
            </li>
        </ul>
    </div>

      <div id='canvas-container'></div>
      <div class="buttonDiv" :style="buttonDivHeightStyle">
        <v-btn class="buttonFullHeight" primary @click.native="handleClick">
          {{ (status==='recording')? 'Stop' : 'Start'}}
        </v-btn>
      </div>
    </div>
</template>
<script>
 /* eslint-disable */
import convertBufferToWav from '@bigear/convertbuffertowav'
import FireStorageUploader from '~/components/FireStorageUploader.vue'
import {TOOLBAR_HEIGHT} from '~/config/ui'
const DEFAULT_CANVAS_HEIGHT = 150
const DEFAULT_BUTTON_HEIGHT = 80
const DEFAULT_AUDIOLIST_PADDING = 5

export default {
  middleware: ['required-login'],
  components: { FireStorageUploader },
  mounted() {
    this.canvasW = window.innerWidth || 200
    this.canvasH = DEFAULT_CANVAS_HEIGHT

    const s = ( sketch ) => {
      this.sketch = sketch
      sketch.setup = this.setup
      sketch.draw = this.draw
    };

    const myp5 = new p5(s, 'canvas-container');
  },
  data: function(){
    return {
        sketch: null,
        status: 'stop',
        mic : null,
        recorder : null,
        soundFile : null,
        fft: null,
        canvasW: null,
        canvasH: null,
        audioList: []
    }
  },
  computed: {
    audioListHeightStyle: function () {
      const winHeight = (process.browser && window.innerHeight) || 500
      const divHeight = winHeight - DEFAULT_CANVAS_HEIGHT - DEFAULT_BUTTON_HEIGHT - TOOLBAR_HEIGHT - DEFAULT_AUDIOLIST_PADDING
      
      return {
        height: `${divHeight}px`,
        // 'margin-top': `${TOOLBAR_HEIGHT}px`
      }
    },
    buttonDivHeightStyle: function(){
      return {
        height: `${DEFAULT_BUTTON_HEIGHT}px`
      }
    }
  },
  methods: {
    setup: function(){
      const {sketch, canvasW, canvasH} = this
      console.log(' -=-=-=-= setup')
      this.canvasEle = sketch.createCanvas(canvasW, canvasH)
      // sketch.createCanvas(200, 200);
    },
    draw: function(){
      const {sketch} = this
      sketch.background(200);
      sketch.noFill()

      if(this.status === 'recording') {
          const {canvasW, fft} = this
          const {map} = sketch
          const spectrum = fft.analyze()
          const SPECTRUM_LENGTH = spectrum.length
          const MAX = 15

          sketch.beginShape()
          for (let i = 0; i<MAX; i++) {
              const index = Math.floor(map(i, 0, MAX, 0, SPECTRUM_LENGTH))
              const x = Math.floor(map(i, 0, MAX, 0, canvasW))
              const _h = map(spectrum[index], 0, 255, DEFAULT_CANVAS_HEIGHT, 0)
              sketch.vertex(x, _h )
          }
          sketch.endShape()
      }
    },
    handleClick: function(){
        const {status} = this
        
        if(status === 'stop')
            return this.handleStart()
        
        if(status === 'recording')
            return this.handleStop()
    },
    handleStart: function(){
        this.status = 'recording'

        this.mic = new p5.AudioIn()
        this.mic.start()
        
        this.recorder = new p5.SoundRecorder()
        this.recorder.setInput(this.mic)
        this.soundFile = new p5.SoundFile()

        this.fft = new p5.FFT()
        this.fft.setInput(this.mic)

        this.recorder.record(this.soundFile)
        // background(255,0,0)
        this.sketch.text('Recording now! Click to stop.', 20, 20)
    },
    handleStop: function(){
        this.status = 'stop'
        this.recorder.stop() // stop recorder, and send the result to soundFile
        this.appendAudioToList()
        this.scrollToBottom('.audioList')
    },
    handleClickRemove: function(index){
        this.audioList.splice(index, 1)
    },
    handleClickCloudUpload: function(index){
      console.log('-=-=-= handleClickCloudUpload -=-=-=')
      const audioItem = this.audioList[index]
      const blob = audioItem.blob
    },
    appendAudioToList: function(){
        // this.soundFile.play() // play the result!
        const {buffer} = this.soundFile
        const dataview = convertBufferToWav(buffer.getChannelData(0))
        const audioBlob = new Blob([dataview], {type: 'audio/wav'})
        const url = URL.createObjectURL(audioBlob)

        this.audioList.push({
            url,
            blob: audioBlob,
            name: `${new Date().toISOString()}.wav`
        })
    },
    scrollToBottom: function(eleClass){
      const tempEle = document.querySelector(eleClass)
      tempEle.scrollTop = tempEle.scrollHeight;
    },
}


}
</script>
<style>
body {
    margin: 0;
}
.buttonDiv {
    bottom: 0;
    position: fixed;
    display: flex;
    width: 100%;
}
.buttonDiv button{
    flex-grow: 1;
    font-size: 50px;
}

#canvas-container {
    position: fixed;
    bottom: 80px;
    margin: 0;
    padding: 0;
}

.audioList{
    overflow: scroll;
}

.audioList ul{
    background:#f1f3f4;
    width: 100%;
    margin: 0;
    padding: 0;
}
.audioList ul li{
    display: flex;
    border-bottom: solid 1px lightgray;
}
.audioList ul li span{
    margin-left: 10px;
    color: gray;
}
.audioList ul li a{
    text-decoration: none;
    color: darkslategrey;
    width: 60px;
}

.audioList ul li audio{
  width: 130px;
}

.iconSize{
  font-size: 30px;
  line-height: 50px;
}
.flexPush {
  margin-left: auto;
}
.buttonFullHeight{
  height: 100%;
}
.dark {
  color: black;
}

</style>
