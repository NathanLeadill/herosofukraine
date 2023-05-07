import type { ReportType } from '$models/report';
import { writable } from 'svelte/store';
import { reports } from './objects/dummyData';
import { mainActiveReport } from './helpers';

// toggleCurtain store
function toggleCurtain(initState: boolean){
  const {subscribe, update} = writable(initState);
  const toggle = () => update(s => !s)
  return {subscribe, toggle}
}

interface SelectedReportType {
  selectedReport: ReportType | undefined;
}

// selectReport store
function selectedReportStore() {
  const { subscribe, update } = writable<SelectedReportType>({
    selectedReport: mainActiveReport,
  });
  
  return {
    subscribe,
    setSelectedReport: (report: ReportType) => (
      update((store) => ({ ...store, selectedReport: report }))
    ),
    clearSelectedReport: () => (
      update((store) => ({ ...store, selectedReport: undefined }))
    ),
  };
};

export const curtainState = toggleCurtain(false);
export const reportState = selectedReportStore();