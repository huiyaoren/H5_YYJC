/**
 * Created by wslsh on 2016/6/25.
 */

// 执行 SQL
function execute_sql(db, sql, data) {
    db.transaction(function (tx) {
        tx.executeSql(
            sql,
            data,
            function () {
            },
            function (tx, error) {
                //console.log(error.message)
            }
        );
    });
}

// 格式化 字段属性名
function get_attr_name(attr) {
    var name = '';
    for (var i in attr) {
        name += i + ', ';
    }
    name = name.slice(0, -2);
    //console.log(name);
    return name
}

// 格式化 字段属性项
function get_attr_item(attr) {
    var item = '';
    for (var i in attr) {
        item += i + ' ' + attr[i] + ', \n';
    }
    item = item.slice(0, -3);
    //console.log(item);
    return item
}

// 格式化 问号
function create_question(attr) {
    var question = '';
    for (var i in attr) {
        question += '?, '
    }
    question = question.slice(0, -2);
    //console.log(question);
    return question
}

// ---------------------------------------------------------------------------


function TB_User(db) {

    var self = this;
    this.table_name = 'tb_User';
    this.table_attr = {
        'username': 'text primary key',
        'password': 'text',
        'nickname': 'text',
        'coin': 'integer',
        'level': 'integer',
        'owning_staff': 'text',
        'using_staff': 'text',
        'record': 'text'
    };
    //get_attr_name(this.table_attr)
    //get_attr_item(this.table_attr);
    //create_question(this.table_attr);

    // 插入 数据
    this.insert = function (data) {
        var sql = "insert into tb_User("
            + get_attr_name(this.table_attr)
            + ") values(" + create_question(this.table_attr) + ")";
        execute_sql(db, sql, data);
    };

    // todo 修改 数据
    this.update = function () {
        //var sql = "update t_employee set "+(empsex='女', salary=15000) +"where "+(empid=1005);
        execute_sql(db, sql);
    };
    //update t_employee set empsex='女', salary=15000 where empid=1005;


    // 删除 表格
    this.drop = function () {
        var sql = "drop table if exists " + self.table_name;
        execute_sql(db, sql);
    };

    // 创建 表格
    this.create = function () {
        var sql = "\
            create table if not exists " + self.table_name + "(\
                " + get_attr_item(this.table_attr) + "\
            )";
        execute_sql(db, sql);
    };

    this.create();
}
// ---------------------------------------------------------------------------

function TB_Biker(db) {
    var self = this;
    this.table_name = 'tb_Biker';
    this.table_attr = {
        'role_id': 'integer primary key',
        'skill': 'text'
    };
}
function TB_Moto(db) {
    var self = this;
    this.table_name = 'tb_Moto';
    this.table_attr = {
        'moto_id': 'integer primary key',
        'max_speed': 'integer'
    };
}
function TB_Wheel(db) {
    var self = this;
    this.table_name = 'tb_Wheel';
    this.table_attr = {
        'wheel_id': 'integer primary key',
        'turning_speed': 'integer'
    };
}
function TB_Engine(db) {
    var self = this;
    this.table_name = 'tb_Engine';
    this.table_attr = {
        'engine_id': 'integer primary key',
        'acceleration': 'integer'
    };
}
