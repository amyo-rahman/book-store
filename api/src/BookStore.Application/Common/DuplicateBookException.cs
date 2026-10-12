namespace BookStore.Application.Common;

public sealed class DuplicateBookException : Exception
{
    public DuplicateBookException()
        : base("This book is already in the store.")
    {
    }

    public DuplicateBookException(string message)
        : base(message)
    {
    }

    public DuplicateBookException(string message, Exception innerException)
        : base(message, innerException)
    {
    }
}
