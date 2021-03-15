export function getSampleBook() {
  return {
    title: 'Example Book',
    id: 'asad',
    authors: ['authorX'],
    currency: 'ISD',
    description: 'Sample Description',
    imageLink:
      '"http://books.google.com/books/content?id=vDJjDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    price: 200,
    publisher: 'publisherX',
  };
}

export const mockBooks = [
  {
    id: 'bookId',
    kind: 'volume',
    selfLink: 'somelink',
    volumeInfo: {
      title: 'Some title',
      description: 'description about book',
      subtitle: 'subtitle',
      authors: ['Douglus Crockford'],
      categories: ['Web', 'angular'],
      averageRating: 4,
      language: 'en',
      pageCount: 150,
      imageLinks: {
        smallThumbnail: '',
        thumbnail: '',
      },
      publishedDate: '28-01-2020',
      publisher: 'OReilly',
      ratingsCount: 10,
    },
  },
];
