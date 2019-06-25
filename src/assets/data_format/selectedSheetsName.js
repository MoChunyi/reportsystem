var selectedSheetsName = [
    {
        name: '', //被选择表的名字
        mount: '数字',//它所挂载的表，没一张表被选入连接板的时候，
                    //  必须挂在一张表上，并且只能挂在一张表上
                    //   即和一张表连接
                    //  第一张表mount 为0，表示为根表，其它表可以选择和谁连接，
                    // 默认和selectedSheetsName的最大index
    }
]