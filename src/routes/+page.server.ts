import { dummyReports } from '$lib/objects/dummyData';
import type { ReportType } from '$models/report';
import { nanoid } from 'nanoid';

export async function load({ params, query }) {
  const { date } = params;
  const response = await fetchReports(date); 
  
  const filteredReports = response
    .map((report: any, index: number) => {
      const randomLat = Math.floor(Math.random() * (53 - 44 + 1)) + 44;
      const randomLng = Math.floor(Math.random() * (44 - 32 + 1)) + 32;
      return {
        id: nanoid(),
        title: report.title,
        description: report.description,
        icon: report.title.includes('civilian') ? 'rose' : 'globe',
        images: report.url ? [{ 
          id: nanoid(), 
          url: report.url 
        }] : [],
        location: [randomLat, randomLng],
        date: new Date(report.created),
        // status depends if report.date is today's date
        status: 'active',
        type: index === 0 ? 'main' : 'secondary',
      }
    })
  ;
  const archivedReports = dummyReports;
  Object.values(archivedReports).map((report: ReportType) => {
    filteredReports.push(report);
  });
  return { filteredReports };
}

async function fetchReports(date: string) {
  let response;
  if(date) {
    response = await fetch(`https://monstar.pythonanywhere.com/api/test/${date}`);
  } else {
    response = await fetch(`https://monstar.pythonanywhere.com/api/test`);
  }
  const jsonResponse = await response.json();
  return jsonResponse;
}
