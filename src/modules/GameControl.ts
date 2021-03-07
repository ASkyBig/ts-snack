import Snack from './Snack';
import Food from './Food';
import ScorePanel from './ScorePanel';

class GameControl {
    snack: Snack;
    food: Food;
    scorePanel: ScorePanel;
    // 创建一个属性存储按键方向
    direction: string = 'ArrowRight';
    isLive: boolean = true;

    constructor() {
        this.snack = new Snack();
        this.food = new Food();
        this.scorePanel = new ScorePanel(10, 1);
        this.init();
    }

    init() {
        // 绑定键盘事件
        document.addEventListener('keydown', this.keydownHandler.bind(this));
        this.run();
        
    }

    keydownHandler(event: KeyboardEvent) {
        console.log(event.key);
        this.direction = event.key;
    }

    run() {
        let x = this.snack.X;
        let y = this.snack.Y;

        switch(this.direction) {
            case 'ArrowUp':
            case 'Up':
                y -= 10;
                break;
            case 'ArrowDown':
                y += 10;
                break;
            case 'ArrowLeft':
                x -= 10;
                break;
            case 'ArrowRight':
                x += 10;
                break;                                             
        }


        this.checkEat(x, y)

        try {
            this.snack.X = x;
            this.snack.Y = y;
        } catch(err) {
            alert(err.message);
            this.isLive = false;
        }

        this.isLive && setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30)
    }

    checkEat(X: number, Y: number) {
        if (X === this.food.X && Y === this.food.Y) {
            this.food.change();
            this.scorePanel.addScore();
            this.snack.addBody();
        }
    }
}

export default GameControl;