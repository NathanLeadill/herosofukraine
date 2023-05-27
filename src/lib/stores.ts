import type { ReportType } from '$models/report';
import { writable } from 'svelte/store';
import { scrollCurtain } from './helpers';
import { dummyReports } from './objects/dummyData';
import { browser } from '$app/environment';

// toggleCurtain store
function toggleCurtain(initState: boolean){
  const {subscribe, update} = writable(initState);
  const toggle = () => {
    update(s => !s)
    scrollCurtain();
  }
  return {subscribe, toggle}
}

interface SelectedReportType {
  selectedReport: ReportType | undefined;
}

// selectReport store
function selectedReportStore() {
  const { subscribe, update } = writable<SelectedReportType>({
    selectedReport: undefined,
  });
  
  return {
    subscribe,
    setSelectedReport: (report: ReportType) => {
      update(() => ({ selectedReport: report }))
    },
    resetSelectedReport: () => {
      update(() => ({ selectedReport: undefined }))
    },
  };
};
export const reportState = selectedReportStore();

// selectedDate store
const selectedDateStore = writable<Date>(new Date());
export const dateState = selectedDateStore;

// Desktop or mobile store
const mobileThreshold = 600;
export const viewport = writable({
  width: browser ? window.innerWidth : 0,
  isMobile: browser ? window.innerWidth <= mobileThreshold : false
});
// Update viewport store on resize
if(browser) {
  window.addEventListener('resize', () => {
    const isMobile = window.innerWidth <= mobileThreshold;
    viewport.set({
      width: window.innerWidth,
      isMobile
    });
  });
}
export const viewportState = viewport;

// Reports store
function reportsStore() {
  const { subscribe, set, update } = writable<ReportType[]>([]);
  
  return {
    subscribe,
    addReport: (report: ReportType) => {
      update((reports) => [...reports, report]);
    },
    updateReport: (id: number, updatedReport: ReportType) => {
      update((reports) => {
        const index = reports.findIndex((report) => report.id === id);
        if (index !== -1) {
          reports[index] = updatedReport;
        }
        return [...reports];
      });
    },
    removeReport: (id: number) => {
      update((reports) => reports.filter((report) => report.id !== id));
    },
    clearReports: () => {
      set([]);
    },
  };
}

export const curtainState = toggleCurtain(false);
export const reports = reportsStore();