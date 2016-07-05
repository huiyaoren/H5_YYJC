/**
 * Created by wslsh on 2016/6/25.
 */

// 执行 SQL
function execute_sql(db, sql, data, fn) {
    db.transaction(function (tx) {
        tx.executeSql(
            sql,
            data,
            function (tt, result) {
                if (fn) {
                    fn(result)
                }
            },
            function (tx, error) {
                console.log(error.message)
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

    // 查询
    this.select = function (data, fn) {
        var sql = "\
            select " + data[0] + " from " + this.table_name + "\
            where " + data[1] + "\
        ";
        execute_sql(db, sql, null, function (result) {
            fn(result)
        });
    };

    // 插入 数据
    this.insert = function (data) {
        var sql = "insert into " + this.table_name + "("
            + get_attr_name(this.table_attr)
            + ") values("
            + create_question(this.table_attr)
            + ")";
        execute_sql(db, sql, data);
    };

    // 修改 数据
    this.update = function (data) {
        var sql = "update " + this.table_name + " set " + data[0] + " where " + data[1];
        execute_sql(db, sql);
    };


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
        'id': 'integer primary key',
        'skill': 'text',
        'name': 'text',
        'price':'integer',
        'img_1':'text',
        'img_2':'text',
        'img_3':'text'
    };

    // 修改 数据
    this.update = function (data) {
        var sql = "update " + this.table_name + " set " + data[0] + " where " + data[1];
        execute_sql(db, sql);
    };

    // 查询
    this.select = function (data, fn) {
        var sql = "\
            select " + data[0] + " from " + this.table_name + "\
            where " + data[1] + "\
        ";
        execute_sql(db, sql, null, function (result) {
            fn(result)
        });
    };

    // 插入 数据
    this.insert = function (data) {
        var sql = "insert into " + this.table_name + "("
            + get_attr_name(this.table_attr)
            + ") values("
            + create_question(this.table_attr)
            + ")";

        execute_sql(db, sql, data);
    };


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
}

// ---------------------------------------------------------------------------

function TB_Moto(db) {
    var self = this;
    this.table_name = 'tb_Moto';
    this.table_attr = {
        'id': 'integer primary key',
        'max_speed': 'integer',
        'name':'text',
        'price':'integer',
        'img_1':'text',
        'img_2':'text'
    };

    // 查询
    this.select = function (data, fn) {
        var sql = "\
            select " + data[0] + " from " + this.table_name + "\
            where " + data[1] + "\
        ";
        execute_sql(db, sql, null, function (result) {
            fn(result)
        });
    };

    // 插入 数据
    this.insert = function (data) {
        var sql = "insert into " + this.table_name + "("
            + get_attr_name(this.table_attr)
            + ") values("
            + create_question(this.table_attr)
            + ")";

        execute_sql(db, sql, data);
    };


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
}

// ---------------------------------------------------------------------------

function TB_Wheel(db) {
    var self = this;
    this.table_name = 'tb_Wheel';
    this.table_attr = {
        'id': 'integer primary key',
        'turning_speed': 'integer',
        'name':'text',
        'price':'integer',
        'img_1':'text',
        'img_2':'text'
    };

    // 查询
    this.select = function (data, fn) {
        var sql = "\
            select " + data[0] + " from " + this.table_name + "\
            where " + data[1] + "\
        ";
        execute_sql(db, sql, null, function (result) {
            fn(result)
        });
    };

    // 插入 数据
    this.insert = function (data) {
        var sql = "insert into " + this.table_name + "("
            + get_attr_name(this.table_attr)
            + ") values("
            + create_question(this.table_attr)
            + ")";

        execute_sql(db, sql, data);
    };


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
}

// ---------------------------------------------------------------------------

function TB_Engine(db) {
    var self = this;
    this.table_name = 'tb_Engine';
    this.table_attr = {
        'id': 'integer primary key',
        'acceleration': 'integer',
        'name':'text',
        'price':'integer',
        'img_1':'text'
    };

    // 查询
    this.select = function (data, fn) {
        var sql = "\
            select " + data[0] + " from " + this.table_name + "\
            where " + data[1] + "\
        ";
        execute_sql(db, sql, null, function (result) {
            fn(result)
        });
    };

    // 插入 数据
    this.insert = function (data) {
        var sql = "insert into " + this.table_name + "("
            + get_attr_name(this.table_attr)
            + ") values("
            + create_question(this.table_attr)
            + ")";

        execute_sql(db, sql, data);
    };


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
}
