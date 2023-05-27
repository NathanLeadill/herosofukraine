import type { ReportType } from "$models/report";

// Data type definitions
type ReportsType = {
  [key: string]: ReportType;
}

export const dummyImages = [
  'https://i.imgur.com/SjfzTQC.jpg',
  'https://i.imgur.com/gdtHIiR.jpg',
  'https://i.imgur.com/HPgongV.jpg',
  'https://i.imgur.com/Sz9dIJf.png',
]

// Data
export const dummyReports: ReportsType = {
  report1: {
    id: 0,
    title: 'Three tanks destroyed',
    description: 'Three tanks were destroyed this saturday during the conflict between the Ukrainian army and the Russian army.',
    icon: 'globe',
    images: [{ 
      id: 0,
      url: 'https://ichef.bbci.co.uk/news/976/mcs/media/images/76121000/jpg/_76121456_ukrslovlocalsafp.jpg',
    }],
    location: [51, 36],
    date: new Date(new Date().setDate(new Date().getDate() - 1)),
    status: 'archived',
    type: 'secondary',
  },
  report2: {
    id: 1,
    title: 'Major offensive launched by Russia',
    description: 'A civilian was killed during the conflict between the Ukrainian army and the Russian army.',
    icon: 'image',
    images: [{
      id: 1,
      url: 'https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/HQXUPJ2X2Y5BPJC4DAPZX3SQF4.png&w=1440',
      caption: 'Photo of the intense fightings',
    }],
    location: [49.9, 39.2],
    date: new Date(new Date().setDate(new Date().getDate() - 1)),
    status: 'archived',
    type: 'secondary',
  },
  report3: {
    id: 3,
    title: 'Ukraine war continues',
    description: 'No resolution in sight as the conflict between the Ukrainian army and the Russian army continues. Twelve russian soldiers were killed during the combat.',
    icon: 'rose',
    images: [{
      id: 0,
      url: 'https://ichef.bbci.co.uk/news/976/mcs/media/images/76121000/jpg/_76121456_ukrslovlocalsafp.jpg',
      caption: 'Photo near the Ukrainian military base',
    }],
    location: [49, 31],
    date: new Date(new Date().setDate(new Date().getDate() - 2)),
    status: 'archived',
    type: 'main',
  },
  report4: {
    id: 4,
    // title about ukraine missiles launched
    title: 'Ukraine launches missiles at Russian forces',
    description: 'Ukraine launched missiles at Russian forces in the Donbass region on Thursday, April 22, 2021.',
    icon: 'user',
    location: [50, 44],
    date: new Date(new Date().setDate(new Date().getDate() - 2)),
    status: 'archived',
    type: 'secondary',
  },
  report5: {
    id: 5,
    title: 'Ukraine loses control of the frontier',
    description: 'Ukraine lost control of the frontier with Russia this morning. The Russian army is now in control of the frontier. The Ukrainian army is now retreating to the city of Donetsk.',
    icon: 'chevron-up',
    location: [48, 39],
    date: new Date(new Date().setDate(new Date().getDate() - 2)),
    status: 'archived',
    type: 'secondary',
  },
};