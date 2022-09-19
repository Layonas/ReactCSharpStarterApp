using Microsoft.AspNetCore.Mvc;
using StarterReactAppAPI.Models;
using StarterReactAppAPI.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace StarterReactAppAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class NoteController : ControllerBase
    {
        public NoteController(NoteService noteService, ILogger<NoteController> logger)
        {
            this.NoteService = noteService;
            this.Logger = logger;
        }

        public ILogger<NoteController> Logger { get; set; }
        public NoteService NoteService { get; set; }

        // GET
        [HttpGet]
        public IEnumerable<Note> Get()
        {
            return NoteService.GetNotes().ToArray();
        }

        // GET note/5
        [HttpGet("{id}")]
        public Note Get(int id)
        {
            return NoteService.getNote(id);
        }

        // POST
        [HttpPost]
        public ActionResult Post([FromBody] Note note)
        {
            NoteService.Save(note);
            return Ok();
        }
    }
}