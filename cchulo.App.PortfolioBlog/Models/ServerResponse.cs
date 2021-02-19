using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace cchulo.App.PortfolioBlog.Models
{
    public enum EServerResponseCode
    {
        Ok = 0,
        Warn = 1,
        Error = 2,
        Fatal = 3
    }

    public class ServerResponse<T>
    {
        public EServerResponseCode ResponseCode { get; set; }

        public string StatusMessage { get; set; }

        public T Content { get; set; }
    }
}
