import { Resolver, Query , Mutation , Arg } from "type-graphql";
import { BooksList } from "../models/Books";
import { CreateBookInput } from "../inputs/CreateBookInput";
import { UpdateBookInput } from "../inputs/UpdateBookInput";

@Resolver()
export class BookResolver {

  //find all----------
  @Query(() => [BooksList])
  books() {
    return BooksList.find()
  }

  // create one --------
  @Mutation(() => BooksList)
  async createBook(@Arg("data") data: CreateBookInput) {
  const book = new BooksList();
        Object.assign(book, data);
        await book.save();
        return book;
}

//find by id-------
@Query(() => BooksList)
book(@Arg("id") id: string) {
  return BooksList.findOne({ where: { id } });
}

//update by id----------
@Mutation(() => BooksList)
async updateBook(@Arg("id") id: string, @Arg("data") data: UpdateBookInput) {
  const book = await BooksList.findOne({ where: { id } });
  if (!book) throw new Error("Book not found!");
  Object.assign(book, data);
  await book.save();
  return book;
}

// delete by id ----------------

@Mutation(() => Boolean)
async deleteBook(@Arg("id") id: string) {
  const book = await BooksList.findOne({ where: { id } });
  if (!book) throw new Error("Book not found!");
  await book.remove();
  return true;
}
}