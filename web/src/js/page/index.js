require(['../config'], function() {
    require(['mui', 'bscroll', 'flex'], function(mui, BScroll, flex) {
        var mark = document.querySelector('.mark');

        function init() {
            mui.init();
            getData();
            addEvent();
            var BS = new BScroll('section', {

            })
        }

        function getData() {
            mui.ajax('/api/getData', {
                success: function(rs) {
                    if (rs.code) {
                        render(rs.data)
                    }
                }
            })
        }

        function render(data) {
            list.innerHTML = data.map(function(item) {
                return `<li>
                            <h1>${item.name}</h1>
                            <p>${item.title}</p>
                            <button>修改</button><button>删除</button>
                        </li>`
            }).join('')
        }

        function addEvent() {
            var footer = document.querySelector('.footer');
            footer.addEventListener('tap', function() {
                mark.style.display = 'block';
            })
        }

        init()
    })
})