var fields = ["1st Max Value", "2nd Max Value", "Arithmetic Mean", "City Name", "Year"];
function get_data(county_name, year, field, callback) {
    var file = "data/data.csv";
    open_file(file, function (file) {
        processData(file, county_name, year, field, callback);
    });
}

function open_file(name, callback) {
    $.ajax({
        type: "GET",
        url: name,
        dataType: "text",
        success: callback
    });
}
function processData(file, county_name, year, field, callback) {
    Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        complete: function(results) {
            results.data = results.data.filter(function(doctor) {
                return doctor["County Code"] === county_name && doctor["Year"] === year && doctor["Parameter Name"] == field;
            }).map(function(obj) {
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