//var keep_fields = ["year", ""];
function get_data(year, fields, callback) {
    var file = "data/Annual_All_Utah_Air_Quality_"+year+".csv";

    $.ajax({
        type: "GET",
        url: file,
        dataType: "text",
        success: function(data) {
            processData(data, fields, callback);
        }
    });
}
function processData(file, fields, callback) {
    Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        complete: function(results) {
            results.data = results.data.map(function(obj) {
                var newObj = {};
                for (var key in fields) {
                    newObj[fields[key]] = obj[fields[key]];
                }
                return newObj;
            });
            console.log(results);
            callback(results);
        }
    });
}