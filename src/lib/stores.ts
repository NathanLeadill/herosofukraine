import type { ReportType } from '$models/report';
import { writable } from 'svelte/store';
import { scrollCurtain } from './helpers';
import { reports } from './objects/dummyData';

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

export const curtainState = toggleCurtain(false);
export const reportState = selectedReportStore();
export const dateState = selectedDateStore;