var app = new Vue({
	el : '#wrapper',
	data : {
		board : [],
		currentItem : false,
		myTurn : false
	},
	methods : {
		init : function(){
			var firstEnemyRow  = ['kale', 'at', 'fil', 'vezir', 'sah', 'fil', 'at', 'kale'];
			var secondEnemyRow = ['piyon', 'piyon', 'piyon', 'piyon', 'piyon', 'piyon', 'piyon', 'piyon'];

			var firstMyRow  = ['piyon', 'piyon', 'piyon', 'piyon', 'piyon', 'piyon', 'piyon', 'piyon'];
			var secondMyRow = ['kale', 'at', 'fil', 'vezir', 'sah', 'fil', 'at', 'kale'];

			for(var y = 0; y < 8; y++){
				for(var x = 0; x < 8; x++){
					//initialized piece will be empy, we'll update if this slot has item in default
					var piece = false;

					//first enemy row
					if(y == 0){
						piece = firstEnemyRow[x];
					}

					if(y == 1){
						piece = secondEnemyRow[x];
					}

					if(y == 6){
						piece = firstMyRow[x];
					}

					if(y == 7){
						piece = secondMyRow[x];
					}

					var item = {
						x : x,
						y : y,
						piece : piece,
						active : false
					};

					this.board.push(item);
				}
			}
		},
		toMove : function(slot){
			if(!this.currentItem){
				slot.active = true;

				this.currentItem = slot;
			}else if(this.currentItem){
				//we'll check if this move is possible?

				if(!this.checkMove(this.currentItem, slot)){
					alert('Cant do that move!');

					this.currentItem.active = false;
					this.currentItem = false;
				}else{
					//we can move because variable is in use
					slot.piece  = this.currentItem.piece;

					this.currentItem.active = false;
					this.currentItem.piece  = false;

					this.currentItem = false;
				}
			}
		},
		checkMove : function(currentSlot, slot){
			var output = false;

			if(currentSlot.piece == 'piyon' && slot.piece == false){
				if(
					currentSlot.x == slot.x && 
					currentSlot.y > slot.y &&
					slot.y >= currentSlot.y - 2
				){
					output = true;
				}
			}

			return output;
		}
	}
});

window.onload = function(){
	app.init();
};