# To do list

* TODO: Concatenative synonyms
* TODO: Logic example
* TODO: Arithmetic example
* TODO: Show that parentheses can be generalized in a blog post
* TODO: Comment all the JA functions

The UX of solving problems:

Group problems into classes. Start with a base (e.g. SK). Allow definitions of known birds but only when they have been constructed from what is known. E.g.

Base: `S, K`

Infer: `I = SKK`

Now you can use `S, K, I` for all future inferences. So we have a base and an ability to declare an inference. We should check that inference automatically. We should enforce only using what has been inferred so far. We should not rely on mutating an environment, this should be a checking function that works on a chain of inferences.

We should allow a lemma-like thing, scratch-pad observations that don't define a new line.

You cannot use something you haven't inferred, obviously.

If you use something that has been defined, you should get a hint that this is a known bird, e.g. if you have a base of SK and you use SKK in an expression, there should be a hint of some kind (perhaps a dashed underline) suggesting that this is a known combinator.