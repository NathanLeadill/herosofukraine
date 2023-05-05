import type { ReportType } from '$models/report';
import { writable } from 'svelte/store';

// toggleCurtain store
function toggleCurtain(initState: boolean){
  const {subscribe, update} = writable(initState);
  const toggle = () => update(s => !s)
  return {subscribe, toggle}
}

interface SelectedReportType {
  selectedReport: ReportType | null;
}

// selectReport store
function selectedReportStore() {
  const { subscribe, update } = writable<SelectedReportType>({
    selectedReport: null,
  });
  
  return {
    subscribe,
    setSelectedReport: (report: ReportType) => (
      update((store) => ({ ...store, selectedReport: report }))
    ),
    clearSelectedReport: () => (
      update((store) => ({ ...store, selectedReport: null }))
    ),
  };
};

export const curtainState = toggleCurtain(false);
export const reportState = selectedReportStore();