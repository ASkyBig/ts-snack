class Snack {
    head: HTMLElement;
    // 蛇的身体，包括头
    bodies: HTMLCollection;

    // 蛇的容器
    element: HTMLElement;

    constructor() {
        this.element = document.getElementById('snack')!;
        this.head = document.querySelector('#snack > div') as HTMLElement;
        this.bodies = this.element!.getElementsByTagName('div');
    }

    // 获取蛇头坐标
    get X() {
        return this.head.offsetLeft;
    }

    get Y() {
        return this.head.offsetTop;
    }

    set X(value: number) {
        if (this.X === value) return;
        if (value < 0 || value > 290) {
            // 撞墙了
            throw new Error('蛇撞墙 ')
        }
        // 修改x时，是在修改水平坐标，蛇想左移动，则不能向右；向右同理
        // 有可能只有蛇头，可以掉头
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value) {
            // 如果掉头了，向反方向继续移动
            if (value > this.X) {
                // 如果value大于旧值x，则说明蛇在往右走，此时发生掉头，应该向左走
                value = this.X - 10;
            } else {
                value = this.X + 10;
            }
        }
        this.moveBody();
        this.head.style.left = value + 'px';
        this.checkHeadBody();
    }

    set Y(value: number) {
        if (this.Y === value) return;
        if (value < 0 || value > 290) {
            // 撞墙了
            throw new Error('蛇撞墙 ')
        }
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
            // 如果掉头了，向反方向继续移动
            if (value > this.Y) {
                // 如果value大于旧值x，则说明蛇在往右走，此时发生掉头，应该向左走
                value = this.Y - 10;
            } else {
                value = this.Y + 10;
            }
        }
        this.moveBody();
        this.head.style.top = value + 'px';
        this.checkHeadBody();
    }

    // 蛇增加长度
    addBody() {
        this.element.insertAdjacentHTML('beforeend', '<div></div>')
    }

    moveBody() {
        //从后往前遍历
        /**
         * 第四节 = 第三节位置
         * 第三节 = 第二节位置
         * 第二节 = 蛇头位置
         */
        for (let i = this.bodies.length - 1; i > 0; i--) {
            let X = (this.bodies[i-1] as HTMLElement).offsetLeft;
            let Y = (this.bodies[i-1] as HTMLElement).offsetTop;

            (this.bodies[i] as HTMLElement).style.left = X + 'px';
            (this.bodies[i] as HTMLElement).style.top = Y + 'px';
        }
    }

    checkHeadBody() {
        // 获取所有身体和蛇头重叠
        for (let i = 1; i < this.bodies.length; i++) {
            let bd = (this.bodies[i] as HTMLElement);
            if (this.X === bd.offsetLeft && this.Y === bd.offsetTop) {
                throw new Error('撞到自己');
            }
        }
    }
}

export default Snack;