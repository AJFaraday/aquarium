class Matches {

  constructor() {
    this.data = match_data;
    this.div = document.getElementById('matches');
    this.build_content();
  }

  build_content() {
    var matches = this;
    this.data.forEach(
      function(match_data, index) {
        var div = document.createElement('div');
        div.id = 'match_' + index;
        
        var title = document.createElement('h2');
        title.innerHTML = match_data.name;
        div.appendChild(title);

        var table = document.createElement('table');
        var thead = document.createElement('thead');
        var tr = document.createElement('tr');
        ['Behaviour', 'Total', 'Snakes', 'Average'].forEach(
          function(header) {
            var th = document.createElement('th');
            th.innerHTML = header;
            tr.appendChild(th);
          }
        );
        thead.appendChild(tr);
        table.appendChild(thead);
        var tbody = document.createElement('tbody');
        Object.values(match_data.scores).forEach(
          function(score) {
            tr = document.createElement('tr');
            [score.name, score.total, score.snakes, score.average].forEach(
              function(data_point) {
                var td = document.createElement('td');
                td.innerHTML = data_point;
                tr.appendChild(td);
              }
            );
            tbody.appendChild(tr);
          }
        );
        table.appendChild(tbody);

        div.appendChild(table);

        var pre = document.createElement('pre');
        pre.innerHTML = match_data.logs.join('\n');
        div.appendChild(pre);

        matches.div.appendChild(div);
      }
    );
  }

}
