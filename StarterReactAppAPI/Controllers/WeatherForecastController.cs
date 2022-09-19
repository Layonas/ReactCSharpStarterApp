using Microsoft.AspNetCore.Mvc;
using StarterReactAppAPI.Models;
using StarterReactAppAPI.Services;

namespace StarterReactAppAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;
        public NoteService noteService;

        public WeatherForecastController(ILogger<WeatherForecastController> logger, NoteService service)
        {
            _logger = logger;
            noteService = service;
        }

        [HttpGet(Name = "GetWeatherForecast")]
        public IEnumerable<Note> Get()
        {
            return noteService.GetNotes().ToArray();
        }
    }
}