class Leaderboard {

  constructor() {
    this.data = score_data;
    this.div = document.getElementById('leaderboard');
    this.build_content();
  }

  build_content() {
    var leaderboard = this;

    var title = document.createElement('h2');
    title.innerHTML = 'Leader Board';
    this.div.appendChild(title);

    var table = document.createElement('table');
    var thead = document.createElement('thead');
    var tr = document.createElement('tr');
    ['Behaviour', 'Score'].forEach(
      function(header) {
        var th = document.createElement('th');
        th.innerHTML = header;
        tr.appendChild(th);
      }
    );
    thead.appendChild(tr);
    table.appendChild(thead);

    var tbody = document.createElement('tbody');
    var snake_options = Array.from(document.querySelectorAll('#snake_select option'));
    Object.keys(this.data).forEach(
      function(behaviour_index) {
        var score = leaderboard.data[behaviour_index];
        var option = snake_options.filter(function(o) {return (o.innerHTML == score.name)})[0];
        tr = document.createElement('tr');
        if(option) {
          tr.id = option.value;
        }
        [score.name, score.score].forEach(
          function(data_point) {
            var td = document.createElement('td');
            td.innerHTML = data_point;
            td.title = score.name + ' wins:\n' + score.wins.join('\n');
            tr.appendChild(td);
          }
        );
        tbody.appendChild(tr);

      }
    );
    table.appendChild(tbody);
    leaderboard.div.append(table);
  }

  hide_most() {
    
  }

}
