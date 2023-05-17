import type { ReportType } from '$models/report';
import { writable } from 'svelte/store';
import { scrollCurtain } from './helpers';
import { reports } from './objects/dummyData';
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
const mainActiveReport = Object.values(reports).find(
  report => report.type === 'main' && report.status === 'active'
)
function selectedReportStore() {
  const { subscribe, update } = writable<SelectedReportType>({
    selectedReport: mainActiveReport,
  });
  
  return {
    subscribe,
    setSelectedReport: (report: ReportType) => {
      update((store) => ({ ...store, selectedReport: report }))
    },
    clearSelectedReport: () => {
      update((store) => ({ ...store, selectedReport: undefined }))
    },
  };
};

// selectedDate store
const selectedDateStore = writable<Date>(new Date());

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

export const curtainState = toggleCurtain(false);
export const reportState = selectedReportStore();
export const dateState = selectedDateStore;
export const viewportState = viewport;