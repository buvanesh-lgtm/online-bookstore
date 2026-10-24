// Mock catalogue. Replace with a REST call (see StoreContext) later.
const b = (id,title,author,category,price,rating,stock,hue,description) =>
  ({ id,title,author,category,price,rating,stock,hue,description })
export const CATEGORIES = ['Fiction','Programming','Database','Science','Business','Self Development','Mystery','Fantasy']
export const books = [
 b(1,'The Midnight Library','Matt Haig','Fiction',399,4.5,12,215,'Between life and death is a library where every book is a different life Nora could have lived.'),
 b(2,'Clean Code','Robert C. Martin','Programming',899,4.7,8,160,'A handbook of agile craftsmanship on writing readable, maintainable code.'),
 b(3,'Database System Concepts','Silberschatz, Korth','Database',1199,4.4,5,25,'The standard university text on relational design, SQL, transactions and storage.'),
 b(4,'A Brief History of Time','Stephen Hawking','Science',349,4.6,15,265,'From the Big Bang to black holes, explained for the curious general reader.'),
 b(5,'Zero to One','Peter Thiel','Business',450,4.3,10,45,'Notes on startups and how to build companies that create the future.'),
 b(6,'Atomic Habits','James Clear','Self Development',499,4.8,20,340,'A practical system for building good habits and breaking bad ones.'),
 b(7,'The Silent Patient','Alex Michaelides','Mystery',380,4.2,7,195,'A famous painter shoots her husband and then never speaks again.'),
 b(8,'The Hobbit','J.R.R. Tolkien','Fantasy',420,4.8,9,95,'Bilbo Baggins is swept into a dragon-guarded treasure quest.'),
 b(9,'The Pragmatic Programmer','Hunt, Thomas','Programming',950,4.6,0,180,'Timeless advice on becoming a more effective, adaptable developer.'),
 b(10,'SQL Performance Explained','Markus Winand','Database',650,4.5,6,5,'How indexes work and how to write queries that stay fast at scale.'),
 b(11,'Cosmos','Carl Sagan','Science',410,4.7,11,235,'A journey through the universe and the history of scientific thought.'),
 b(12,'The Lean Startup','Eric Ries','Business',475,4.1,3,15,'Build, measure, learn: a scientific approach to launching new products.'),
 b(13,'Gone Girl','Gillian Flynn','Mystery',360,4.3,14,350,'On their anniversary, Amy disappears and suspicion falls on her husband.'),
 b(14,'Mistborn: The Final Empire','Brandon Sanderson','Fantasy',520,4.7,2,285,'A crew of thieves plots to overthrow an immortal tyrant.'),
 b(15,'Deep Work','Cal Newport','Self Development',430,4.5,13,125,'Rules for focused success in a distracted world.'),
]
