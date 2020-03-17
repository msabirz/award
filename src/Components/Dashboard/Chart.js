import React from 'react';
import {
  ResponsiveContainer, PieChart, Pie,
} from 'recharts';
import Title from '../Common/Title';
// import Title from '../../Containers/Title';


// Generate Sales Data
const data1 = [
  { name: 'Group A', value: 400 }, { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 }, { name: 'Group D', value: 200 },
];

export function Chart() {
  return (
    <React.Fragment>
      <Title>Entrants List</Title>
      <div style={{ width: '100%', height:400}}>
          <ResponsiveContainer>
            <PieChart>
              <Pie dataKey="value" data={data1} fill="#8884d8" label />
            </PieChart>
          </ResponsiveContainer>  
          </div>
    </React.Fragment>
  );
}
