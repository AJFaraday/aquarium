class Leaderboard {

  constructor() {
    this.data = score_data;
    this.full = false;
    this.div = document.getElementById('leaderboard');
    this.build_content();
    this.hide_most();
  }

  build_content() {
    var leaderboard = this;

    var title = document.createElement('h2');
    title.innerHTML = 'Leader Board';
    this.div.appendChild(title);

    var table = document.createElement('table');
    var thead = document.createElement('thead');
    var tr = document.createElement('tr');
    ['Pos.', 'Behaviour', 'Score'].forEach(
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
      function(behaviour_index, index) {
        var score = leaderboard.data[behaviour_index];
        var option = snake_options.filter(function(o) {return (o.innerHTML == score.name)})[0];
        tr = document.createElement('tr');
        tr.setAttribute('class', 'score_row');
        if(option) {
          tr.id = option.value;
        }

        var link = document.createElement('a');
        link.href = 'show_behaviour.html?behaviour=' + score.behaviour_key;
        link.setAttribute('target', '_blank');
        link.innerHTML = score.name;

        [(index + 1), link, score.score.toFixed(2)].forEach(
          function(data_point) {
            var td = document.createElement('td');
            if(typeof data_point == 'object') {
              td.appendChild(data_point);
            } else {
              td.innerHTML = data_point;
            }
            td.title = score.name + ' wins:\n' + score.wins.join('\n');
            tr.appendChild(td);
          }
        );
        tbody.appendChild(tr);

      }
    );
    tr = document.createElement('tr');
    tr.id = 'link_row';
    tr.appendChild(document.createElement('td'));
    var td = document.createElement('td');
    td.setAttribute('colspan', '2');
    leaderboard.show_hide_link = document.createElement('a');
    leaderboard.show_hide_link.href = '#';
    leaderboard.show_hide_link.innerHTML = 'Show All';
    leaderboard.show_hide_link.onclick = function(e) {
      e.preventDefault();
      leaderboard.toggle();
    };
    td.appendChild(leaderboard.show_hide_link);
    tr.appendChild(td);
    tbody.appendChild(tr);

    table.appendChild(tbody);
    leaderboard.div.append(table);
  }

  toggle() {
    if(this.full) {
      this.full = false;
      this.show_hide_link.innerHTML = 'Show All';
      this.hide_most();
    } else {
      this.full = true;
      this.show_hide_link.innerHTML = 'Hide Most';
      this.show_all();
    }
  }

  show_all() {
    document.querySelectorAll('tr').forEach(
      function(row) {
        row.style.display = 'table-row';
      }
    )
  }

  hide_most() {
    document.querySelectorAll('.score_row').forEach(
      function(row, index) {
        row.style.display = 'none';
        if((index <= 2) || row.getAttribute('id') == localStorage.getItem('snake') || row.id == 'link_row') {
          row.style.display = 'table-row';
        }
      }
    )
  }

}
