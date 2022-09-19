using System.Text.Json;
using StarterReactAppAPI.Controllers;
using StarterReactAppAPI.Models;

namespace StarterReactAppAPI.Services
{
    public class NoteService
    {
        private IWebHostEnvironment _webHostEnvironment { get; }

        private readonly ILogger<NoteService> _logger;

        public NoteService(IWebHostEnvironment webHostEnvironment, ILogger<NoteService> logger)
        {
            this._webHostEnvironment = webHostEnvironment;
            _logger = logger;
        }

        private string JsonFileName
        {
            get
            {
                return Path.Combine(_webHostEnvironment.ContentRootPath, "DatabaseMock.json");
            }
        }

        public IEnumerable<Note> GetNotes()
        {
            if (File.Exists(JsonFileName))
            {
                using (StreamReader reader = new StreamReader(JsonFileName))
                {
                    string json = reader.ReadToEnd();
                    if (json.Length == 0)
                        return Enumerable.Empty<Note>();

                    IEnumerable<Note>? notes = JsonSerializer.Deserialize<IEnumerable<Note>>(json,
                        new JsonSerializerOptions
                        {
                            PropertyNameCaseInsensitive = true
                        });

                    if (notes is null)
                        return Enumerable.Empty<Note>();
                    else
                        return notes;
                }
            }
            else
                return Enumerable.Empty<Note>();
        }

        public Note getNote(int id)
        {
            IEnumerable<Note> notes = GetNotes();

            return notes.First(note => note.Id == id);
        }

        public void Save(Note note)
        {
            if (!File.Exists(JsonFileName))
            {
                File.Create(JsonFileName);
            }

            var notes = GetNotes();
            notes = notes.Append(note);

            using (var writer = File.OpenWrite(JsonFileName))
            {
                JsonSerializer.Serialize<IEnumerable<Note>>(
                    new Utf8JsonWriter(writer, new JsonWriterOptions
                    {
                        SkipValidation = true,
                        Indented = true
                    }
                                      ),
                    notes);
                writer.Close();
            }
        }
    }
}