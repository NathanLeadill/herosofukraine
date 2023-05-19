import { dummyReports } from '$lib/objects/dummyData';
import type { ReportType } from '$models/report';
import { nanoid } from 'nanoid';

export async function load() {
  const response = await fetch('https://monstar.pythonanywhere.com/api/test/');
  const fetchedData = await response.json();
  
  console.log('# fetchedData :', fetchedData)
  const reports = fetchedData.map((report: any, index: number) => {
    console.log('# report :', report)
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
      date: report.created,
      // status depends if report.date is today's date
      status: 'active',
      type: index === 0 ? 'main' : 'secondary',
    }
  });
  const archivedReports = dummyReports;
  Object.values(archivedReports).map((report: ReportType) => {
    reports.push(report);
  });
  return { reports };
}
