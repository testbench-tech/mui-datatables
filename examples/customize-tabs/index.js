import { FormGroup, FormLabel, TextField, Typography } from '@material-ui/core';
import React from 'react';
import ReactDOM from 'react-dom';
import MUIDataTable from '../../src';

class Example extends React.Component {
  render() {
    const columns = [
      {
        name: 'Name',
        options: {
          filter: true,
          display: 'excluded',
        },
      },
      {
        label: 'Title',
        name: 'Title',
        options: {
          filter: true,
          customBodyRender: (cell, options) => {
            return (
              <span>{options.tableTabId === 'title' ? cell[0] : `${cell[0]} (${cell[1]})`}</span>
            );
          },
        },
      },
      {
        name: 'Location',
        options: {
          print: false,
          filter: false,
        },
      },
      {
        name: 'Age',
        options: {
          filter: true,
          filterType: 'custom',
          filterList: [25, 50],
          customFilterListRender: v => {
            if (v[0] && v[1]) {
              return `Min Age: ${v[0]}, Max Age: ${v[1]}`;
            } else if (v[0]) {
              return `Min Age: ${v[0]}`;
            } else if (v[1]) {
              return `Max Age: ${v[1]}`;
            }
            return false;
          },
          filterOptions: {
            names: [],
            logic(age, filters) {
              if (filters[0] && filters[1]) {
                return age < filters[0] || age > filters[1];
              } else if (filters[0]) {
                return age < filters[0];
              } else if (filters[1]) {
                return age > filters[1];
              }
              return false;
            },
            display: (filterList, onChange, index, column) => (
              <div>
                <FormLabel>Age</FormLabel>
                <FormGroup row>
                  <TextField
                    label="min"
                    value={filterList[index][0] || ''}
                    onChange={event => {
                      filterList[index][0] = event.target.value;
                      onChange(filterList[index], index, column);
                    }}
                    style={{ width: '45%', marginRight: '5%' }}
                  />
                  <TextField
                    label="max"
                    value={filterList[index][1] || ''}
                    onChange={event => {
                      filterList[index][1] = event.target.value;
                      onChange(filterList[index], index, column);
                    }}
                    style={{ width: '45%' }}
                  />
                </FormGroup>
              </div>
            ),
          },
          print: false,
        },
      },
      {
        name: 'Salary',
        options: {
          filter: true,
          filterType: 'checkbox',
          filterOptions: {
            names: ['Lower wages', 'Average wages', 'Higher wages'],
            logic(salary, filterVal) {
              salary = salary.replace(/[^\d]/g, '');
              const show =
                (filterVal.indexOf('Lower wages') >= 0 && salary < 100000) ||
                (filterVal.indexOf('Average wages') >= 0 && salary >= 100000 && salary < 200000) ||
                (filterVal.indexOf('Higher wages') >= 0 && salary >= 200000);
              return !show;
            },
          },
          sort: false,
        },
      },
    ];

    const data = [
      ['Gabby George', ['Business Analyst', 'BA'], 'Minneapolis', 30, '$100,000'],
      ['Aiden Lloyd', ['Business Consultant', 'BC'], 'Dallas', 55, '$200,000'],
      ['Jaden Collins', ['Attorney', 'AT'], 'Santa Ana', 27, '$500,000'],
      ['Franky Rees', ['Business Analyst', 'BA'], 'St. Petersburg', 22, '$50,000'],
      ['Aaren Rose', ['Business Consultant', 'BC'], 'Toledo', 28, '$75,000'],
      ['Blake Duncan', ['Business Management Analyst', 'BMA'], 'San Diego', 65, '$94,000'],
      ['Frankie Parry', ['Agency Legal Counsel', 'LC'], 'Jacksonville', 71, '$210,000'],
      ['Lane Wilson', ['Commercial Specialist', 'CS'], 'Omaha', 19, '$65,000'],
      ['Robin Duncan', ['Business Analyst', 'BA'], 'Los Angeles', 20, '$77,000'],
      ['Mel Brooks', ['Business Consultant', 'BC'], 'Oklahoma City', 37, '$135,000'],
      ['Harper White', ['Attorney', 'AT'], 'Pittsburgh', 52, '$420,000'],
      ['Kris Humphrey', ['Agency Legal Counsel', 'LC'], 'Laredo', 30, '$150,000'],
      ['Frankie Long', ['Industrial Analyst', 'IA'], 'Austin', 31, '$170,000'],
      ['Brynn Robbins', ['Business Analyst', 'BA'], 'Norfolk', 22, '$90,000'],
      ['Justice Mann', ['Business Consultant', 'BC'], 'Chicago', 24, '$133,000'],
      ['Addison Navarro', ['Business Management Analyst', 'BMA'], 'New York', 50, '$295,000'],
      ['Jesse Welch', ['Agency Legal Counsel', 'LC'], 'Seattle', 28, '$200,000'],
      ['Eli Mejia', ['Commercial Specialist', 'CT'], 'Long Beach', 65, '$400,000'],
      ['Gene Leblanc', ['Industrial Analyst', 'IA'], 'Hartford', 34, '$110,000'],
      ['Danny Leon', ['Computer Scientist', 'CS'], 'Newark', 60, '$220,000'],
      ['Lane Lee', ['Corporate Counselor', 'CC'], 'Cincinnati', 52, '$180,000'],
      ['Jesse Hall', ['Business Analyst', 'BA'], 'Baltimore', 44, '$99,000'],
      ['Danni Hudson', ['Agency Legal Counsel', 'LC'], 'Tampa', 37, '$90,000'],
      ['Terry Macdonald', ['Commercial Specialist', 'CT'], 'Miami', 39, '$140,000'],
      ['Justice Mccarthy', ['Attorney', 'AT'], 'Tucson', 26, '$330,000'],
      ['Silver Carey', ['Computer Scientist', 'CS'], 'Memphis', 47, '$250,000'],
      ['Franky Miles', ['Industrial Analyst', 'IA'], 'Buffalo', 49, '$190,000'],
      ['Glen Nixon', ['Corporate Counselor', 'CC'], 'Arlington', 44, '$80,000'],
      ['Gabby Strickland', ['Business Process Consultant', 'BPC'], 'Scottsdale', 26, '$45,000'],
      ['Mason Ray', ['Computer Scientist', 'CSS'], 'San Francisco', 39, '$142,000'],
    ];

    const options = {
      filter: true,
      filterType: 'dropdown',
      responsive: 'scroll',
      textLabels: {
        body: {
          columnHeaderTooltip: column => <Typography variant="body1">Sort for {column.name}</Typography>
        },
      },
      tabs: [{ name: 'Title', id: 'title', hint: <Typography variant="body1">This is the title</Typography> }, { name: 'Title Abbreviation', id: 'abbv', hint: <Typography variant="body1">This is the abbreviation</Typography> }],
      customSort: (data, colIndex, order, selectedTabId) => {
        return data.sort((a, b) => {
          let aa = a.data[colIndex];
          if (colIndex === 1) {
            aa = aa[selectedTabId === 'title' ? 0 : 1];
          }
          let bb = b.data[colIndex];
          if (colIndex === 1) {
            bb = bb[selectedTabId === 'title' ? 0 : 1];
          }
          return (aa < bb ? -1: 1 ) * (order === 'desc' ? 1 : -1);
        });
      }
    };

    return (
      <MUIDataTable data={data} columns={columns} options={options} />
    );
  }
}

ReactDOM.render(<Example />, document.getElementById('app-root'));
