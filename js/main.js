var vm = new Vue({
  el: '#app',
  data: {
    current: {},
    pictures: pictures.slice(),
    total: 0,
    correct: 0,
    ended: false,
    loading: true
  },
  computed: {
    // percentage correct
    percentage: function() {
      return Math.round(((parseFloat(this.correct) / parseFloat(this.total)) * 100) / 10) * 10
    }
  },
  methods: {
    selectRandomPicture: function() {
      var count = this.pictures.length;
      if (count >= 1) {
        var index = Math.floor(Math.random() * count);
        return this.pictures.splice(index, 1)[0]
      }
      else {
        return null
      }
    },
    
    play: function() {
      var newPic = this.selectRandomPicture();
      if (newPic == null) {
        this.endGame()
      }
      else {
        // prevent duplicate pictures
        while (newPic.url == this.current.url) {
          console.log("duplicate");
          var newPic = this.selectRandomPicture();
        }
        this.current = newPic;
      }
    },
    
    endGame: function() {
      this.ended = true;
      console.log("end game.")
    },
    
    answer: function(name) {
      if (this.ended == true) { return null }
      
      if (name == this.current.type) {
        this.correct++;
      }
      
      this.total++;
      this.play();
    },
    
    restart: function() {
      this.total = 0;
      this.correct = 0;
      this.ended = false;
      this.pictures = pictures.slice();
      this.play();
      console.log("restart!")
    }
  }
});

vm.play();

