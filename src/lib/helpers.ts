import type { RequestEvent } from '../routes/api/fetch-heros/$types';
import { reports } from './objects/dummyData';
import { dateState } from './stores';

export function jsonResponse<T>(data: T, status = 200): Response {
	return new Response(JSON.stringify(data), {
		headers: { 'Content-Type': 'application/json' },
		status
	});
}

export async function jsonRequest<T>(request: RequestEvent): Promise<T> {
	try {
		return await request.request.json();
	} catch {
		throw 'Invalid JSON body';
	}
}

// Get the time since the last update
export function timeSinceUpdate(lastUpdated: Date) {
	// Format date
  const dateFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
	const formatter = new Intl.DateTimeFormat('en-US', dateFormatOptions);
  // const timeZoneName = Intl.DateTimeFormat().resolvedOptions().timeZone;
	
	// Get the current date
	const now = new Date();
	
	// Compute the difference between the two dates in milliseconds
	const diffMillis = now.getTime() - lastUpdated.getTime();
	
	// Convert the difference to minutes or hours
	const diffSeconds = Math.floor(diffMillis / 1000);
	const diffMinutes = Math.floor(diffMillis / (1000 * 60));
	const diffHours = Math.floor(diffMillis / (1000 * 60 * 60));
	const diffDays = Math.floor(diffMillis / (1000 * 60 * 60 * 24));
	
	// Display the result
	if (diffHours > 0 && diffHours < 24) {
		return `Updated ${diffHours} hours ago`
	} else if (diffMinutes > 0 && diffMinutes < 60) {
		return `Updated ${diffMinutes} minutes ago`
	} else if (diffSeconds > 0 && diffSeconds < 60) {
		return `Updated ${diffSeconds} seconds ago`
	} else if (diffHours >= 24 && diffDays < 3) {
		return `Updated ${diffDays} days ago`
	} else {
		return `${formatter.format(lastUpdated)}`;
		// return `${formatter.format(lastUpdated)} (${timeZoneName})`
	}
}

// Get the main active report
export const mainActiveReport = Object.values(reports).find(
  report => report.type === 'main' && report.status === 'active'
);

// Scroll curtain to top
export function scrollCurtain() {
  const scrollableContainer = document.querySelector('.curtain-body');
  if(scrollableContainer){
    scrollableContainer.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}

// Get previous or next day
export function getPreviousOrNextDay(date: Date, previous: 'previous' | 'next') {
	const newDate = new Date(date);
	if(previous === 'previous'){
		newDate.setDate(newDate.getDate() - 1);
	} else if(previous === 'next'){
		newDate.setDate(newDate.getDate() + 1);
	} else {
		throw "Invalid 'previous | next' value";
	}
	dateState.set(newDate);
	return newDate;
}

// Check if date is today
export const isToday = (date: Date) => {
	const today = new Date();
	return (
		date.getDate() === today.getDate() &&
		date.getMonth() === today.getMonth() &&
		date.getFullYear() === today.getFullYear()
	);
};