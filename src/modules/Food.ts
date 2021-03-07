class Food {
    element: HTMLElement;
    constructor () {
        // !表示不为空
        // 获取页面中的food元素并将其赋值给element
        this.element = document.getElementById('food')!;
    }

    get X () {
        return this.element.offsetLeft;
    }

    get Y () {
        return this.element.offsetTop;
    }

    change () {
        // 移动一次10px（0-290）
        let top = Math.round(Math.random() * 29) * 10; 
        let left = Math.round(Math.random() * 29) * 10; 
        this.element.style.left = left + 'px';
        this.element.style.top = top + 'px';
    }
}

export default Food;