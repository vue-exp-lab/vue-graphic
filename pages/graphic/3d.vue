 <template>
    <div>
      <div id='canvas-container'></div>
    </div>
</template>
<script>
 /* eslint-disable */
import convertBufferToWav from '@bigear/convertbuffertowav'
import FireStorageUploader from '~/components/FireStorageUploader.vue'
import {TOOLBAR_HEIGHT} from '~/config/ui'
const DEFAULT_CANVAS_HEIGHT = 350
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
        canvasW: null,
        canvasH: null,
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
    }
  },
  methods: {
    setup: function(){
      const {sketch, canvasW, canvasH} = this
      this.canvasEle = sketch.createCanvas(canvasW, canvasH, sketch.WEBGL)
    },
    draw: function(){
      const {sketch} = this

      sketch.background(0);

      var locX = sketch.mouseX - sketch.height / 2;
      var locY = sketch.mouseY - sketch.width / 2;
      
      sketch.push();

      sketch.ambientLight(50);
      sketch.directionalLight(128, 128, 128, 0.25, 0.25, 0);
      sketch.pointLight(0, 0, 255, locX, locY, 250);

      // sketch.translate(-sketch.width / 4, 0, 0);
      // sketch.rotateZ(sketch.frameCount * 0.02);
      // sketch.rotateX(sketch.frameCount * 0.02);
      sketch.specularMaterial(250);
      sketch.box(100, 100, 100);
      // sketch.pop();

      // sketch.translate(sketch.width / 4, 0, 0);
      // sketch.ambientMaterial(250);
      // sketch.sphere(60, 64);

      sketch.translate(sketch.width / 2, 0, 0);
      // sketch.rotateZ(sketch.frameCount * 0.01);
      sketch.rotateX(0.5);
      // sketch.rotateY(sketch.frameCount * 0.01);
      sketch.plane(500);
    }
  }
}
</script>
<style>


</style>
