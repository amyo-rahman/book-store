using System.Globalization;
using System.Text.Json.Serialization;
using BookStore.Application;
using BookStore.Infrastructure;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSerilog(config => config
    .ReadFrom.Configuration(builder.Configuration)
    .Enrich.FromLogContext()
    .WriteTo.Console(
        outputTemplate: "[{Timestamp:HH:mm:ss} {Level:u3}] {TraceId} {Message:lj}{NewLine}{Exception}",
        formatProvider: CultureInfo.InvariantCulture));

var connectionString = builder.Configuration.GetConnectionString("BookStore")
    ?? throw new InvalidOperationException("Connection string 'BookStore' is not configured.");

builder.Services.AddControllers()
    .AddJsonOptions(options => options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()));
builder.Services.AddOpenApi();
builder.Services.AddHealthChecks();
builder.Services.AddApplication();
builder.Services.AddInfrastructure(connectionString);

var app = builder.Build();

app.UseSerilogRequestLogging();

await app.Services.InitialiseDatabaseAsync();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.MapHealthChecks("/api/health");
app.MapControllers();

await app.RunAsync();
