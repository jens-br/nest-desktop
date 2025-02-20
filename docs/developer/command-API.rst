Command API
===========


This documentation guide provides detailed information about the command ``nest-desktop``.

Show the usage of the :code:`nest-desktop` command:

.. code-block:: bash

  nest-desktop

|

Options for :code:`nest-desktop`:

.. code-block:: bash

  nest-desktop status|start|stop|restart [-h <HOST>] [-p <PORT>]


.. _commands:

**Commands**

:status: display the status of NEST Desktop
:start: start a new server instance for NEST Desktop
:stop: stop a server instance running on <HOST>:<PORT>
:restart:  restart (i.e. stop and start) a server on <HOST>:<PORT>

.. _arguments:

**Arguments**

:-h <HOST>: use hostname/IP address <HOST> for the server [default: 127.0.0.1]
:-p <PORT>: use port <PORT> for opening the socket [default: 8000]

||||

.. _environment-variables:

**Environment variables**

You can set environment variables for host and port before you start NEST Desktop.

.. code-block:: bash

  export NEST_DESKTOP_HOST="0.0.0.0"
  export NEST_DESKTOP_PORT=8000

  nest-desktop start
